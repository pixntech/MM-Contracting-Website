# MM Contracting — Projects Gallery UX Fix

This patch corrects the projects experience to the intended flow:

Home
→ Projects Gallery preview
→ View All Projects
→ `/gallery`
→ one card per project
→ click a project
→ `/gallery/:projectId`
→ project details + full photo gallery

## What changed

- There is no separate duplicate Projects portfolio experience in the navigation.
- The navbar has one clear entry: Projects Gallery / معرض المشاريع.
- The home page shows a clean visual preview of projects.
- The home page no longer repeats the same projects again in a separate Featured Projects section.
- `/gallery` shows one card per real project, not dozens of separate photos.
- Project cards keep the grid visual and lightweight: cover image, category, title, status and photo count.
- Client, Consultant, Works Value, Scope and Completion Date are shown only after clicking the project.
- Every project detail page includes its complete local photo gallery and lightbox.
- `/projects` and `/projects/:projectId` remain compatible as legacy URLs, but use the same gallery experience.
- Includes all real project data and local project images, so the patch can be applied even if the previous projects patch was not applied.
- Removes obsolete duplicate `ProjectsPage` and `FeaturedProjects` source files if present.
- Does not touch `.env`, `node_modules`, or `.git`.
- Creates a timestamped backup before changing files.

## Windows PowerShell

```powershell
Expand-Archive -Path ".\MM-Projects-Gallery-UX-Fix-Patch-V2.zip" -DestinationPath "." -Force
powershell -ExecutionPolicy Bypass -File ".\MM-Projects-Gallery-UX-Fix-Patch-V2\apply-patch.ps1"
npm run dev
```
