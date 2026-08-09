# MM Organization Chart Patch

Adds a dedicated `/organization` page using the organization chart supplied by MM Contracting.

Changes:
- Adds a responsive bilingual organization chart page.
- Adds Organization / الهيكل التنظيمي to the navbar and footer.
- Preserves the reporting hierarchy from the supplied company chart.
- Adjusts the desktop navigation breakpoint to avoid overcrowding.
- Does not touch `.env`, `node_modules`, or `.git`.
- Creates a timestamped backup before applying changes.

Run from the MM project root:

```powershell
Expand-Archive -Path ".\MM-Organization-Chart-Patch.zip" -DestinationPath "." -Force
powershell -ExecutionPolicy Bypass -File ".\MM-Organization-Chart-Patch\apply-patch.ps1"
npm run dev
```
