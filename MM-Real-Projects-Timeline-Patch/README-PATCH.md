# MM Contracting — Real Projects Timeline Patch

Replaces the fictional company-history timeline with a chronological timeline based only on the real projects supplied in the MM Contracting company profile.

Timeline order:
1. MMK Pack Factory — June 2018
2. Al Tameer Arabian Sales Office — August 2019
3. Luxor Azhar Institute — February 2020
4. Palm Hills Factory — January 2021
5. Hada'ek El Asema — August 2021
6. Rivan Compound — December 2022
7. Rivan Square — December 2022
8. Rivan Tower — December 2022
9. Mansoura Azhar Institute — In Progress

Each timeline card links to the corresponding project details page in the Projects Gallery.

The patch also removes the old fictional `history.ts` data and obsolete milestone-card component.

This patch expects the Real Projects Gallery patch to already be applied because it uses the real project dataset and local project images.

## Windows PowerShell

```powershell
Expand-Archive -Path ".\MM-Real-Projects-Timeline-Patch.zip" -DestinationPath "." -Force
powershell -ExecutionPolicy Bypass -File ".\MM-Real-Projects-Timeline-Patch\apply-patch.ps1"
npm run dev
```
