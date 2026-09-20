param(
    [string]$ProjectRoot = ""
)

$ErrorActionPreference = "Stop"

function Resolve-ProjectRoot {
    param([string]$RequestedRoot)

    if ($RequestedRoot -and $RequestedRoot.Trim() -ne "") {
        return (Resolve-Path $RequestedRoot).Path
    }

    $cwd = (Get-Location).Path
    if ((Test-Path (Join-Path $cwd "package.json")) -and (Test-Path (Join-Path $cwd "src"))) {
        return $cwd
    }

    $patchParent = Split-Path -Parent $PSScriptRoot
    if ((Test-Path (Join-Path $patchParent "package.json")) -and (Test-Path (Join-Path $patchParent "src"))) {
        return $patchParent
    }

    throw "Could not detect the MM project root. Run from the project root, or pass -ProjectRoot <path>."
}

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"

$files = @(
    "src/data/clients.ts",
    "src/sections/Clients.tsx",
    "src/types/index.ts",
    "src/i18n/locales/ar.json",
    "src/i18n/locales/en.json"
)

foreach ($rel in $files) {
    $source = Join-Path $payload $rel
    if (-not (Test-Path $source)) {
        throw "Patch payload is missing: $rel"
    }
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host ""
Write-Host "MM Trusted Companies Hotfix" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

foreach ($rel in $files) {
    $current = Join-Path $root $rel
    if (Test-Path $current) {
        $backup = Join-Path $backupRoot $rel
        $backupDir = Split-Path -Parent $backup
        if ($backupDir) {
            New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
        }
        Copy-Item -LiteralPath $current -Destination $backup -Force
    }
}

foreach ($rel in $files) {
    $source = Join-Path $payload $rel
    $dest = Join-Path $root $rel
    $destDir = Split-Path -Parent $dest
    if ($destDir) {
        New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    }
    Copy-Item -LiteralPath $source -Destination $dest -Force
    Write-Host "[UPDATED] $rel" -ForegroundColor Green
}

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Trusted companies hotfix applied successfully." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: npm run build"
Write-Host "Then: npm run dev"
