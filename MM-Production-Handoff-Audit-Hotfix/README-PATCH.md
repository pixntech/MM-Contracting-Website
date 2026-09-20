# MM Production Handoff Audit + Security Headers

This patch adds a final handoff verification command without replacing the application source.

## It adds
- `npm run verify:production`
- TypeScript/lint/build gate (via existing project scripts)
- static source checks
- secret leakage scan
- public asset reference checks
- Arabic/English translation-key completeness checks
- SEO/robots/sitemap checks
- production dependency vulnerability audit (`npm audit --omit=dev`)
- production `dist` checks
- Chrome/Edge smoke tests on Arabic + English, mobile + desktop, core routes
- runtime JS errors, local resource failures, horizontal overflow and visible raw i18n-key checks
- saved reports: `production-audit-report.txt` and `.json`

## Security hardening
Merges these Vercel response headers while preserving existing rewrites:
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: SAMEORIGIN
- Permissions-Policy: camera/microphone/geolocation/payment/usb disabled
- Strict-Transport-Security: max-age=31536000

CSP is intentionally not enforced yet because the current site still uses external media/assets. The audit reports this as a warning so it can be handled safely after the final external-asset allowlist is known.

## Apply
```powershell
Expand-Archive -Path .\MM-Production-Handoff-Audit-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Production-Handoff-Audit-Hotfix\apply-patch.ps1
npm run verify:production
```
