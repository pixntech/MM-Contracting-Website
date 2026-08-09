# MM Real Company Data Patch

This patch updates the MM website with the verified company profile details currently available and replaces the old map implementation with a Google Maps address-based location/directions experience.

## Apply on Windows PowerShell

Extract this folder inside the MM project root, then run:

```powershell
powershell -ExecutionPolicy Bypass -File ".\MM-Real-Company-Data-Patch\apply-patch.ps1"
```

Then:

```powershell
npm run dev
```

The patch does NOT touch `.env`, `node_modules`, or `.git` and creates a timestamped backup before changing files.
