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
    $text = [System.IO.File]::ReadAllText($Path)
    return $text.TrimStart([char]0xFEFF)
}

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host ""
Write-Host "MM Production Audit Repair Hotfix" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

$backupFiles = @(
    "package.json",
    "vercel.json",
    "scripts/production-audit.mjs",
    "src/components/ui/JourneyRoad.tsx",
    "src/sections/CompanyHistory.tsx",
    "src/data/journeyRoad.ts"
)

foreach ($rel in $backupFiles) {
    $current = Join-Path $root $rel
    if (Test-Path $current) {
        $backup = Join-Path $backupRoot $rel
        $dir = Split-Path -Parent $backup
        if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        Copy-Item -LiteralPath $current -Destination $backup -Force
    }
}

# 1) Normalize package.json to UTF-8 without BOM and use a production-only lint scope.
$packagePath = Join-Path $root "package.json"
$pkgRaw = Read-TextNoBom $packagePath
$pkg = $pkgRaw | ConvertFrom-Json
if (-not $pkg.scripts) { $pkg | Add-Member -NotePropertyName scripts -NotePropertyValue ([pscustomobject]@{}) }
$pkg.scripts | Add-Member -NotePropertyName "lint:production" -NotePropertyValue "oxlint src" -Force
$pkg.scripts | Add-Member -NotePropertyName "verify:production" -NotePropertyValue "npm run lint:production && npm run build && node scripts/production-audit.mjs" -Force
$packageJson = $pkg | ConvertTo-Json -Depth 100
Write-Utf8NoBom $packagePath $packageJson
Write-Host "[FIXED] package.json UTF-8 no BOM + production lint scope" -ForegroundColor Green

# 2) Normalize vercel.json too because the previous PowerShell writer could add a BOM.
$vercelPath = Join-Path $root "vercel.json"
if (Test-Path $vercelPath) {
    $vercelRaw = Read-TextNoBom $vercelPath
    $vercelObj = $vercelRaw | ConvertFrom-Json
    $vercelJson = $vercelObj | ConvertTo-Json -Depth 100
    Write-Utf8NoBom $vercelPath $vercelJson
    Write-Host "[FIXED] vercel.json UTF-8 no BOM" -ForegroundColor Green
}

# 3) Replace production audit script with corrected exclusions.
$auditSource = Join-Path $payload "scripts/production-audit.mjs"
$auditDest = Join-Path $root "scripts/production-audit.mjs"
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $auditDest) | Out-Null
Copy-Item -LiteralPath $auditSource -Destination $auditDest -Force
Write-Host "[UPDATED] scripts/production-audit.mjs" -ForegroundColor Green

# 4) Remove Fast Refresh lint noise from current source by keeping road constants out of the component module.
$journeySource = Join-Path $payload "src/components/ui/JourneyRoad.tsx"
$journeyDest = Join-Path $root "src/components/ui/JourneyRoad.tsx"
Copy-Item -LiteralPath $journeySource -Destination $journeyDest -Force
Write-Host "[UPDATED] src/components/ui/JourneyRoad.tsx" -ForegroundColor Green

$dataSource = Join-Path $payload "src/data/journeyRoad.ts"
$dataDest = Join-Path $root "src/data/journeyRoad.ts"
Copy-Item -LiteralPath $dataSource -Destination $dataDest -Force
Write-Host "[ADDED] src/data/journeyRoad.ts" -ForegroundColor Green

$historyPath = Join-Path $root "src/sections/CompanyHistory.tsx"
$history = Read-TextNoBom $historyPath
$oldImport = "import { JourneyRoad, MILESTONE_COORDS } from '../components/ui/JourneyRoad'"
$newImport = "import { JourneyRoad } from '../components/ui/JourneyRoad'`r`nimport { MILESTONE_COORDS } from '../data/journeyRoad'"
if ($history.Contains($oldImport)) {
    $history = $history.Replace($oldImport, $newImport)
    Write-Utf8NoBom $historyPath $history
    Write-Host "[UPDATED] src/sections/CompanyHistory.tsx import" -ForegroundColor Green
} elseif (-not $history.Contains("../data/journeyRoad")) {
    throw "CompanyHistory import shape was not recognized. No unsafe automatic edit was made."
} else {
    Write-Host "[OK] CompanyHistory already uses src/data/journeyRoad" -ForegroundColor DarkGreen
}

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Production audit repair applied successfully." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run verify:production" -ForegroundColor Yellow
