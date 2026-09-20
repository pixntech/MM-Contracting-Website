# MM Build Errors Micro Hotfix

Fixes the two TypeScript build errors reported after the latest MM hotfixes:

- Removes unused `COMPANY` import from `src/sections/Map.tsx`.
- Removes unused `idx` parameter from the Marquee `renderItem` callback in `src/sections/Partners.tsx`.

This patch edits the current files in place and backs them up first. It does not overwrite either file with an older full-file copy.

## Apply

```powershell
Expand-Archive -Path .\MM-Build-Errors-Micro-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Build-Errors-Micro-Hotfix\apply-patch.ps1
npm run build
```
