# MM Contracting — Trusted Companies Hotfix

Built on the latest MM baseline after the Arabic / active-navbar / certificates hotfix.

## What changes

- Replaces the placeholder / unverified client names in the Home "Trusted" section.
- Uses the starred companies from the supplied handwritten company list:
  - Ezz Steel / حديد عز
  - MOPCO / موبكو
  - Ceramica Cleopatra / سيراميكا كليوباترا
  - Samsung / سامسونج
  - El Sallab / السلاب
  - Mahgoub / محجوب
  - LG / إل جي
  - River Cool / ريفر كول
- Shows company logos where a reliable logo source was available, with a safe text fallback if an image cannot load.
- Localizes the visible company name in Arabic mode.
- Updates the section heading/description so it no longer claims partnerships with unrelated global energy companies.
- Removes the old placeholder testimonials from the rendered section. No testimonial is shown until MM supplies an approved real quote.

## Safety

The patch creates a timestamped backup before replacing files.
It does not touch `.env`, `node_modules`, or `.git`.

## Apply

From the project root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\MM-Trusted-Companies-Hotfix\apply-patch.ps1
npm run build
npm run dev
```
