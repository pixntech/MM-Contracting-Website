param(
    [string]$ProjectRoot = ""
)

$ErrorActionPreference = "Stop"

function Resolve-ProjectRoot {
    param([string]$RequestedRoot)
    if ($RequestedRoot -and $RequestedRoot.Trim() -ne "") { return (Resolve-Path $RequestedRoot).Path }
    $cwd = (Get-Location).Path
    if ((Test-Path (Join-Path $cwd "package.json")) -and (Test-Path (Join-Path $cwd "src"))) { return $cwd }
    $patchParent = Split-Path -Parent $PSScriptRoot
    if ((Test-Path (Join-Path $patchParent "package.json")) -and (Test-Path (Join-Path $patchParent "src"))) { return $patchParent }
    throw "Could not detect the MM project root. Run from the project root, or pass -ProjectRoot <path>."
}

function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Read-TextNoBom {
    param([string]$Path)
    return ([System.IO.File]::ReadAllText($Path)).TrimStart([char]0xFEFF)
}

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$files = @(
    "index.html",
    "src/utils/seo.ts",
    "src/data/gallery.ts",
    "src/data/whyChooseUs.ts",
    "src/data/news.ts",
    "src/i18n/locales/en.json",
    "src/i18n/locales/ar.json",
    "src/sections/LatestNews.tsx",
    "public/sitemap.xml",
    "public/robots.txt",
    "scripts/production-audit.mjs"
)

foreach ($rel in $files) {
    $source = Join-Path $payload $rel
    if (-not (Test-Path $source)) { throw "Patch payload is missing: $rel" }
}

Write-Host ""
Write-Host "MM Final Production Cleanup Hotfix" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

$backupFiles = @($files + @("package.json", "vercel.json", "package-lock.json"))
foreach ($rel in $backupFiles) {
    $current = Join-Path $root $rel
    if (Test-Path $current) {
        $backup = Join-Path $backupRoot $rel
        $dir = Split-Path -Parent $backup
        if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        Copy-Item -LiteralPath $current -Destination $backup -Force
    }
}

foreach ($rel in $files) {
    $source = Join-Path $payload $rel
    $dest = Join-Path $root $rel
    $dir = Split-Path -Parent $dest
    if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    Copy-Item -LiteralPath $source -Destination $dest -Force
    Write-Host "[UPDATED] $rel" -ForegroundColor Green
}

# Dependency hygiene + security patch releases.
$packagePath = Join-Path $root "package.json"
$pkg = (Read-TextNoBom $packagePath) | ConvertFrom-Json
if (-not $pkg.dependencies) { $pkg | Add-Member -NotePropertyName dependencies -NotePropertyValue ([pscustomobject]@{}) }
if (-not $pkg.devDependencies) { $pkg | Add-Member -NotePropertyName devDependencies -NotePropertyValue ([pscustomobject]@{}) }

$pkg.dependencies | Add-Member -NotePropertyName "react" -NotePropertyValue "^19.2.8" -Force
$pkg.dependencies | Add-Member -NotePropertyName "react-dom" -NotePropertyValue "^19.2.8" -Force
$pkg.dependencies | Add-Member -NotePropertyName "react-router-dom" -NotePropertyValue "^7.18.4" -Force

foreach ($name in @("@tailwindcss/vite", "tailwindcss")) {
    $prop = $pkg.dependencies.PSObject.Properties[$name]
    if ($prop) {
        $version = [string]$prop.Value
        $pkg.dependencies.PSObject.Properties.Remove($name)
        $pkg.devDependencies | Add-Member -NotePropertyName $name -NotePropertyValue $version -Force
    }
}

$packageJson = $pkg | ConvertTo-Json -Depth 100
Write-Utf8NoBom $packagePath $packageJson
Write-Host "[UPDATED] package.json dependency hygiene/security versions" -ForegroundColor Green

# Add CSP while preserving all existing Vercel rewrites/headers.
$vercelPath = Join-Path $root "vercel.json"
if (Test-Path $vercelPath) {
    $cfg = (Read-TextNoBom $vercelPath) | ConvertFrom-Json
} else {
    $cfg = [pscustomobject]@{}
}
if (-not $cfg.rewrites) {
    $cfg | Add-Member -NotePropertyName rewrites -NotePropertyValue @([pscustomobject]@{ source = "/(.*)"; destination = "/index.html" }) -Force
}

$csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests"

$securityHeaders = @(
    [pscustomobject]@{ key = "X-Content-Type-Options"; value = "nosniff" },
    [pscustomobject]@{ key = "Referrer-Policy"; value = "strict-origin-when-cross-origin" },
    [pscustomobject]@{ key = "X-Frame-Options"; value = "SAMEORIGIN" },
    [pscustomobject]@{ key = "Permissions-Policy"; value = "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    [pscustomobject]@{ key = "Strict-Transport-Security"; value = "max-age=31536000" },
    [pscustomobject]@{ key = "Content-Security-Policy"; value = $csp }
)
$otherHeaders = @()
if ($cfg.headers) { $otherHeaders = @($cfg.headers | Where-Object { $_.source -ne "/(.*)" }) }
$cfg | Add-Member -NotePropertyName headers -NotePropertyValue (@($otherHeaders) + @([pscustomobject]@{ source = "/(.*)"; headers = $securityHeaders })) -Force
Write-Utf8NoBom $vercelPath ($cfg | ConvertTo-Json -Depth 100)
Write-Host "[UPDATED] vercel.json CSP + security headers" -ForegroundColor Green

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Final production cleanup applied." -ForegroundColor Cyan
Write-Host "Your .env and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: dependency versions changed, so run:" -ForegroundColor Yellow
Write-Host "  npm install" -ForegroundColor Yellow
Write-Host "  npm run verify:production" -ForegroundColor Yellow
