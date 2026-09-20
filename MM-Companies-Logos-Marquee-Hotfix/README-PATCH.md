# MM Companies Logos + Marquee Hotfix

## What this hotfix changes

1. Replaces the **Ezz Steel** logo with the user-provided local logo.
2. Replaces the **Ceramica Cleopatra** logo with the user-provided local logo.
3. Changes **River Cool** to **Mazloum / مظلوم** in the trusted companies cards.
4. Converts the **Trusted Collaborations / Partners** home section into a clean moving marquee / ticker of all company names without logos.
5. Updates the `/partners` page to show a clean grid of all company names.
6. Adds support for `nameAr` in partners data so Arabic mode shows Arabic labels.

## Notes

- Only the Ezz Steel and Ceramica Cleopatra logos were provided in this turn, so those were embedded locally.
- Mazloum is currently shown by name only. If you want the exact official logo too, send it and it can be swapped in with a tiny follow-up hotfix.
- No `.env`, `node_modules`, or `.git` content is touched.

## Apply

From the MM project root in PowerShell:

```powershell
Expand-Archive -Path .\MM-Companies-Logos-Marquee-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Companies-Logos-Marquee-Hotfix\apply-patch.ps1
npm run build
npm run dev
```
