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
$mapFile = Join-Path $root "src/sections/Map.tsx"
$partnersFile = Join-Path $root "src/sections/Partners.tsx"

if (-not (Test-Path $mapFile)) { throw "Missing file: src/sections/Map.tsx" }
if (-not (Test-Path $partnersFile)) { throw "Missing file: src/sections/Partners.tsx" }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path (Join-Path $backupRoot "src/sections") | Out-Null
Copy-Item -LiteralPath $mapFile -Destination (Join-Path $backupRoot "src/sections/Map.tsx") -Force
Copy-Item -LiteralPath $partnersFile -Destination (Join-Path $backupRoot "src/sections/Partners.tsx") -Force

Write-Host ""
Write-Host "MM Build Errors Micro Hotfix" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

$map = Get-Content -LiteralPath $mapFile -Raw
$oldMapImport = "import { COMPANY, getDirectionsUrl, getMapEmbedUrl } from '../constants'"
$newMapImport = "import { getDirectionsUrl, getMapEmbedUrl } from '../constants'"
if ($map.Contains($oldMapImport)) {
    $map = $map.Replace($oldMapImport, $newMapImport)
    Set-Content -LiteralPath $mapFile -Value $map -Encoding UTF8
    Write-Host "[FIXED] src/sections/Map.tsx - removed unused COMPANY import" -ForegroundColor Green
} elseif ($map.Contains($newMapImport)) {
    Write-Host "[SKIPPED] src/sections/Map.tsx already fixed" -ForegroundColor DarkYellow
} else {
    throw "Map.tsx import did not match expected code; no change was made."
}

$partners = Get-Content -LiteralPath $partnersFile -Raw
$oldRender = "renderItem={(partner, idx) => {"
$newRender = "renderItem={(partner) => {"
if ($partners.Contains($oldRender)) {
    $partners = $partners.Replace($oldRender, $newRender)
    Set-Content -LiteralPath $partnersFile -Value $partners -Encoding UTF8
    Write-Host "[FIXED] src/sections/Partners.tsx - removed unused idx parameter" -ForegroundColor Green
} elseif ($partners.Contains($newRender)) {
    Write-Host "[SKIPPED] src/sections/Partners.tsx already fixed" -ForegroundColor DarkYellow
} else {
    throw "Partners.tsx renderItem signature did not match expected code; no change was made."
}

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Build-errors micro hotfix applied successfully." -ForegroundColor Cyan
Write-Host "Only Map.tsx and Partners.tsx were touched." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run build"
