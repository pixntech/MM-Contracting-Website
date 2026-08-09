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

    throw "Could not detect the MM project root. Run from the project root or pass -ProjectRoot <path>."
}

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"
$rel = "src/sections/Gallery.tsx"

$source = Join-Path $payload $rel
$dest = Join-Path $root $rel

if (-not (Test-Path $source)) {
    throw "Patch payload is missing: $rel"
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
$backup = Join-Path $backupRoot $rel
$backupDir = Split-Path -Parent $backup

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

if (Test-Path $dest) {
    Copy-Item -LiteralPath $dest -Destination $backup -Force
    Write-Host "[BACKUP] $rel" -ForegroundColor DarkGray
}

Copy-Item -LiteralPath $source -Destination $dest -Force
Write-Host "[UPDATED] $rel" -ForegroundColor Green

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Home Projects Marquee patch applied successfully." -ForegroundColor Cyan
Write-Host "Home project cards now open the Projects Gallery page." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run dev"
