# MM Final Production Cleanup Hotfix

This cleanup addresses the issues found by the production handoff audit:

- removes unsupported legacy marketing claims (27 years / 25 countries / demo news)
- replaces demo news with factual project highlights from the real project data
- fixes stale/missing local gallery asset references
- uses an existing local logo as the OG image so social metadata has a real asset
- makes sitemap URLs absolute and consistent with `https://mm-contracting.com`
- excludes dev-only audit files and all patch/backup folders from production scans
- improves Chrome/Edge discovery for the browser smoke test on Windows
- adds Content-Security-Policy to the Vercel headers
- updates React 19.2.7 -> 19.2.8 and React Router DOM 7.18.1 -> 7.18.4
- moves Tailwind build tooling from runtime dependencies to devDependencies
- makes the project-highlights CTA open `/gallery`

## Apply

```powershell
Expand-Archive -Path .\MM-Final-Production-Cleanup-Hotfix.zip -DestinationPath . -Force
powershell -ExecutionPolicy Bypass -File .\MM-Final-Production-Cleanup-Hotfix\apply-patch.ps1
npm install
npm run verify:production
```

## Important

The sitemap and robots file are now consistent with the existing project metadata domain: `https://mm-contracting.com`.
If the company's final production domain is different, change it before handoff/deployment.
