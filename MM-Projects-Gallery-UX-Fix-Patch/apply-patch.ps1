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

    throw "Could not detect the MM project root. Run this command from the project root, or pass -ProjectRoot <path>."
}

$root = Resolve-ProjectRoot $ProjectRoot
$payload = Join-Path $PSScriptRoot "payload"

$files = @(
    "src/types/index.ts",
    "src/data/projects.ts",
    "src/components/ui/Icon.tsx",
    "src/sections/Gallery.tsx",
    "src/pages/GalleryPage.tsx",
    "src/pages/ProjectDetailsPage.tsx",
    "src/pages/Home.tsx",
    "src/App.tsx",
    "src/data/navigation.ts",
    "src/i18n/locales/en.json",
    "src/i18n/locales/ar.json",
    "public/sitemap.xml",
    "public/projects/altameer-arabian-sales-office-1.webp",
    "public/projects/altameer-arabian-sales-office-2.webp",
    "public/projects/altameer-arabian-sales-office-3.webp",
    "public/projects/altameer-arabian-sales-office-4.webp",
    "public/projects/hadaek-el-asema-1.webp",
    "public/projects/hadaek-el-asema-2.webp",
    "public/projects/hadaek-el-asema-3.webp",
    "public/projects/hadaek-el-asema-4.webp",
    "public/projects/luxor-azhar-institute-1.webp",
    "public/projects/luxor-azhar-institute-2.webp",
    "public/projects/luxor-azhar-institute-3.webp",
    "public/projects/luxor-azhar-institute-4.webp",
    "public/projects/mansoura-azhar-institute-1.webp",
    "public/projects/mansoura-azhar-institute-2.webp",
    "public/projects/mansoura-azhar-institute-3.webp",
    "public/projects/mansoura-azhar-institute-4.webp",
    "public/projects/mmk-pack-factory-1.webp",
    "public/projects/mmk-pack-factory-2.webp",
    "public/projects/mmk-pack-factory-3.webp",
    "public/projects/palm-hills-factory-1.webp",
    "public/projects/palm-hills-factory-2.webp",
    "public/projects/palm-hills-factory-3.webp",
    "public/projects/palm-hills-factory-4.webp",
    "public/projects/rivan-compound-1.webp",
    "public/projects/rivan-compound-2.webp",
    "public/projects/rivan-compound-3.webp",
    "public/projects/rivan-compound-4.webp",
    "public/projects/rivan-square-1.webp",
    "public/projects/rivan-square-2.webp",
    "public/projects/rivan-square-3.webp",
    "public/projects/rivan-square-4.webp",
    "public/projects/rivan-tower-1.webp",
    "public/projects/rivan-tower-2.webp",
    "public/projects/rivan-tower-3.webp",
    "public/projects/rivan-tower-4.webp",
)

$deleteFiles = @(
    "src/pages/ProjectsPage.tsx",
    "src/sections/FeaturedProjects.tsx",
    "public/projects/building-site-works.webp",
    "public/projects/mmk-pack-factory.webp",
)

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host ""
Write-Host "MM Projects Gallery UX Fix Patch" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

foreach ($rel in ($files + $deleteFiles)) {
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

    if (-not (Test-Path $source)) {
        throw "Patch payload is missing: $rel"
    }

    $destDir = Split-Path -Parent $dest
    if ($destDir) {
        New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    }

    Copy-Item -LiteralPath $source -Destination $dest -Force
    Write-Host "[UPDATED] $rel" -ForegroundColor Green
}

foreach ($rel in $deleteFiles) {
    $target = Join-Path $root $rel
    if (Test-Path $target) {
        Remove-Item -LiteralPath $target -Force
        Write-Host "[REMOVED OLD] $rel" -ForegroundColor Yellow
    }
}

$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Projects Gallery UX patch applied successfully." -ForegroundColor Cyan
Write-Host "Flow: Home Gallery -> All Projects -> Project Details." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run dev"
