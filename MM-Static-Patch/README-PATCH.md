# MM Static Frontend Patch

Run this patch from the root of your existing MM project.

PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File ".\MM-Static-Patch\apply-patch.ps1"
```

The patch:
- updates only the frontend files required for the static conversion;
- removes the old Admin/Auth/API source files;
- clears only the generated `.vite` cache;
- does NOT touch `.env`, `node_modules`, or `.git`;
- creates a timestamped backup inside the patch folder before changing files.

After it finishes, run your normal project command, e.g. `npm run dev`.
