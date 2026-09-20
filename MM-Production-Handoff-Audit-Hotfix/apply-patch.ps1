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

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host ""
Write-Host "MM Production Handoff Audit + Security Headers" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

# Backup mutable files
foreach ($rel in @("package.json", "vercel.json", "scripts/production-audit.mjs")) {
    $current = Join-Path $root $rel
    if (Test-Path $current) {
        $backup = Join-Path $backupRoot $rel
        $dir = Split-Path -Parent $backup
        if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        Copy-Item -LiteralPath $current -Destination $backup -Force
    }
}

# Add audit script
$scriptSource = Join-Path $payload "scripts/production-audit.mjs"
$scriptDest = Join-Path $root "scripts/production-audit.mjs"
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $scriptDest) | Out-Null
Copy-Item -LiteralPath $scriptSource -Destination $scriptDest -Force
Write-Host "[UPDATED] scripts/production-audit.mjs" -ForegroundColor Green

# Add package script without replacing package.json wholesale
$packagePath = Join-Path $root "package.json"
$pkg = Get-Content -LiteralPath $packagePath -Raw | ConvertFrom-Json
if (-not $pkg.scripts) { $pkg | Add-Member -NotePropertyName scripts -NotePropertyValue ([pscustomobject]@{}) }
$pkg.scripts | Add-Member -NotePropertyName "verify:production" -NotePropertyValue "npm run lint && npm run build && node scripts/production-audit.mjs" -Force
$pkg | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $packagePath -Encoding utf8
Write-Host "[UPDATED] package.json -> verify:production" -ForegroundColor Green

# Merge safe Vercel security headers while preserving existing config
$vercelPath = Join-Path $root "vercel.json"
if (Test-Path $vercelPath) {
    $cfg = Get-Content -LiteralPath $vercelPath -Raw | ConvertFrom-Json
} else {
    $cfg = [pscustomobject]@{}
}
if (-not $cfg.rewrites) {
    $cfg | Add-Member -NotePropertyName rewrites -NotePropertyValue @([pscustomobject]@{ source = "/(.*)"; destination = "/index.html" }) -Force
}
$securityHeaders = @(
    [pscustomobject]@{ key = "X-Content-Type-Options"; value = "nosniff" },
    [pscustomobject]@{ key = "Referrer-Policy"; value = "strict-origin-when-cross-origin" },
    [pscustomobject]@{ key = "X-Frame-Options"; value = "SAMEORIGIN" },
    [pscustomobject]@{ key = "Permissions-Policy"; value = "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    [pscustomobject]@{ key = "Strict-Transport-Security"; value = "max-age=31536000" }
)
$otherHeaders = @()
if ($cfg.headers) {
    $otherHeaders = @($cfg.headers | Where-Object { $_.source -ne "/(.*)" })
}
$mergedHeaders = @($otherHeaders) + @([pscustomobject]@{ source = "/(.*)"; headers = $securityHeaders })
$cfg | Add-Member -NotePropertyName headers -NotePropertyValue $mergedHeaders -Force
$cfg | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $vercelPath -Encoding utf8
Write-Host "[UPDATED] vercel.json security headers" -ForegroundColor Green

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Production audit tooling installed." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run verify:production" -ForegroundColor Yellow
