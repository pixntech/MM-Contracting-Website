# MM Production Audit Repair Hotfix

Fixes issues discovered by the first production handoff verification run.

## Fixes
- Rewrites `package.json` as UTF-8 **without BOM** so Vite/PostCSS can parse it.
- Rewrites `vercel.json` as UTF-8 **without BOM** as well.
- Adds `lint:production` so archived patch/backup folders are not linted as production source.
- Updates `verify:production` to use the production lint scope.
- Updates the audit walker to ignore all top-level MM Patch/Hotfix archives and its own reports/script.
- Removes current `JourneyRoad.tsx` Fast Refresh warnings by moving shared milestone coordinates to `src/data/journeyRoad.ts`.

## Apply
```powershell
Expand-Archive -Path .\MM-Production-Audit-Repair-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Production-Audit-Repair-Hotfix\apply-patch.ps1
npm run verify:production
```
