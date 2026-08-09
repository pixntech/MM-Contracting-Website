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

$overwriteFiles = @(
    ".gitignore",
    "README.md",
    "STATIC_ARCHITECTURE.md",
    "package-lock.json",
    "package.json",
    "src/App.tsx",
    "src/i18n/locales/ar.json",
    "src/i18n/locales/en.json",
    "src/pages/CertificatesPage.tsx",
    "src/sections/Certificates.tsx",
    "src/sections/FeaturedProjects.tsx",
    "src/sections/LatestNews.tsx",
    "src/sections/Services.tsx"
)

$deleteFiles = @(
    "src/api/axios.ts",
    "src/components/admin/AdminLayout.tsx",
    "src/components/admin/AdminTable.tsx",
    "src/components/admin/NewsForm.tsx",
    "src/components/admin/ProjectForm.tsx",
    "src/components/admin/ProtectedRoute.tsx",
    "src/context/AuthContext.tsx",
    "src/hooks/useAuth.ts",
    "src/pages/admin/AdminCertificates.tsx",
    "src/pages/admin/AdminDashboard.tsx",
    "src/pages/admin/AdminLogin.tsx",
    "src/pages/admin/AdminNews.tsx",
    "src/pages/admin/AdminServices.tsx",
    "src/pages/admin/ProjectsManager.tsx",
    "src/utils/compressImage.ts"
)

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $PSScriptRoot ("backup-" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host ""
Write-Host "MM Static Frontend Patch" -ForegroundColor Cyan
Write-Host "Project: $root"
Write-Host "Backup:  $backupRoot"
Write-Host ""

# Backup only files that the patch will overwrite or delete.
foreach ($rel in ($overwriteFiles + $deleteFiles)) {
    $source = Join-Path $root $rel
    if (Test-Path $source) {
        $backup = Join-Path $backupRoot $rel
        $backupDir = Split-Path -Parent $backup
        if ($backupDir) {
            New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
        }
        Copy-Item -LiteralPath $source -Destination $backup -Force
    }
}

# Apply changed/new files.
foreach ($rel in $overwriteFiles) {
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

# Remove obsolete Admin/API source files.
foreach ($rel in $deleteFiles) {
    $target = Join-Path $root $rel
    if (Test-Path $target) {
        Remove-Item -LiteralPath $target -Force
        Write-Host "[REMOVED] $rel" -ForegroundColor Yellow
    }
}

# Remove now-empty source folders only.
$emptyDirs = @(
    "src/pages/admin",
    "src/components/admin",
    "src/api",
    "src/context"
)
foreach ($rel in $emptyDirs) {
    $dir = Join-Path $root $rel
    if (Test-Path $dir) {
        $items = @(Get-ChildItem -LiteralPath $dir -Force)
        if ($items.Count -eq 0) {
            Remove-Item -LiteralPath $dir -Force
        }
    }
}

# Clear Vite's generated cache so it cannot retain the old axios/admin bundle.
$viteCache = Join-Path $root ".vite"
if (Test-Path $viteCache) {
    Remove-Item -LiteralPath $viteCache -Recurse -Force
    Write-Host "[CLEARED] .vite cache" -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Patch applied successfully." -ForegroundColor Cyan
Write-Host "Your .env, node_modules and .git were NOT touched." -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now run your normal command, for example: npm run dev"
