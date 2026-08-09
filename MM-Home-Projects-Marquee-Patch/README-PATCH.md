# MM Contracting — Home Projects Marquee Patch

This patch changes only the Projects Gallery section on the home page.

## New home-page behavior
- Restores the original moving marquee presentation.
- Uses the real MM Contracting project images and project names.
- Two continuous rows move in opposite directions.
- Animation pauses while hovering.
- Clicking any home project preview opens `/gallery`.
- The **View All Projects** button also opens `/gallery`.
- Individual project details remain available only after selecting a project from the Projects Gallery page.
- Does not touch project data, project details pages, certificates, timeline, contact data, `.env`, `node_modules`, or `.git`.

## Windows PowerShell

```powershell
Expand-Archive -Path ".\MM-Home-Projects-Marquee-Patch.zip" -DestinationPath "." -Force
powershell -ExecutionPolicy Bypass -File ".\MM-Home-Projects-Marquee-Patch\apply-patch.ps1"
npm run dev
```
