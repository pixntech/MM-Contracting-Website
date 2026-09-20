# MM Mazloum Logo Hotfix

This tiny follow-up hotfix replaces the Mazloum company fallback text/logo with the user-provided official logo.

## Files updated
- src/data/clients.ts
- public/clients/mazloum.png

## Apply
```powershell
Expand-Archive -Path .\MM-Mazloum-Logo-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Mazloum-Logo-Hotfix\apply-patch.ps1
npm run build
npm run dev
```
