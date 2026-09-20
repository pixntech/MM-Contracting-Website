# MM Contracting — Arabic + Active Navigation + Text Certificates Hotfix

This hotfix is built on the supplied latest MM Contracting baseline.

## Changes

1. Arabic UI cleanup
   - Adds every missing About / Contact / Map translation that was rendering as raw keys.
   - Fixes the Oil & Gas and Power & Energy industry translation-key mismatch.
   - Localizes the company legal name and office address in Arabic mode.

2. Active navbar state
   - Highlights the current page in the desktop and mobile navbar.
   - Tracks the active Home section while scrolling.
   - Keeps Gallery active for both `/gallery/*` and legacy `/projects/*` URLs.
   - Highlights the Contact CTA when the visitor is in Contact.
   - Improves hash scrolling with a fixed-header offset.

3. Certificates without document scans
   - Removes certificate/document scan images from certificate cards, the Home certificates carousel, and the details modal.
   - Keeps the same certificate/document information: organization, title, description, reference, date and status.
   - Replaces the image-heavy presentation with clean credential cards and icons.
   - The original image assets are left untouched on disk for safety, but are no longer rendered by the UI.

## Safety

The patch creates a timestamped backup before overwriting files.
It never touches `.env`, `node_modules`, or `.git`.

## After applying

Run:

```powershell
npm run build
npm run dev
```
