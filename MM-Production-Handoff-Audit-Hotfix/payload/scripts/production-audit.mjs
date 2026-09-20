import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawn, spawnSync } from 'node:child_process'

const root = process.cwd()
const results = []

function add(level, check, details = '') {
  results.push({ level, check, details })
  const icon = level === 'PASS' ? '✅' : level === 'WARN' ? '⚠️' : '❌'
  console.log(`${icon} ${level.padEnd(4)}  ${check}${details ? ` — ${details}` : ''}`)
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel))
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = path.relative(root, full).replaceAll('\\', '/')
    if (
      rel.startsWith('node_modules/') ||
      rel.startsWith('.git/') ||
      rel.startsWith('dist/') ||
      /(^|\/)backup-\d/.test(rel) ||
      /^MM-.*-Hotfix\//.test(rel)
    ) continue
    if (entry.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

function flatten(obj, prefix = '', out = new Set()) {
  for (const [key, value] of Object.entries(obj ?? {})) {
    const next = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) flatten(value, next, out)
    else out.add(next)
  }
  return out
}

function scanTextFiles() {
  const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.html', '.css', '.xml', '.txt'])
  return walk(root).filter((f) => exts.has(path.extname(f).toLowerCase()))
}

function isLikelyText(buf) {
  const sample = buf.subarray(0, Math.min(buf.length, 4096))
  return !sample.includes(0)
}

async function sourceChecks() {
  console.log('\n========== SOURCE / SECURITY / SEO ==========' )

  for (const rel of ['package.json', 'package-lock.json', 'index.html', 'vercel.json', 'public/robots.txt', 'public/sitemap.xml']) {
    add(exists(rel) ? 'PASS' : 'FAIL', `Required file: ${rel}`)
  }

  if (exists('index.html')) {
    const html = read('index.html')
    add(/<meta\s+name=["']viewport["']/i.test(html) ? 'PASS' : 'FAIL', 'Viewport meta tag')
    add(/<meta\s+name=["']description["']/i.test(html) ? 'PASS' : 'FAIL', 'Meta description')
    add(/<title>[^<]+<\/title>/i.test(html) ? 'PASS' : 'FAIL', 'Page title')

    const og = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
      ?? html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i)
    if (og) {
      const ref = og[1]
      if (ref.startsWith('/')) add(exists(`public${ref}`) ? 'PASS' : 'FAIL', 'OG image exists', ref)
      else add('WARN', 'OG image is external', ref)
    } else add('WARN', 'OG image meta tag missing')
  }

  if (exists('vercel.json')) {
    try {
      const cfg = JSON.parse(read('vercel.json'))
      const hasRewrite = Array.isArray(cfg.rewrites) && cfg.rewrites.some((r) => r.destination === '/index.html')
      add(hasRewrite ? 'PASS' : 'FAIL', 'SPA rewrite to /index.html')

      const headerRows = Array.isArray(cfg.headers) ? cfg.headers.flatMap((h) => h.headers || []) : []
      const headerKeys = new Set(headerRows.map((h) => String(h.key).toLowerCase()))
      const required = ['x-content-type-options', 'referrer-policy', 'x-frame-options', 'permissions-policy', 'strict-transport-security']
      for (const key of required) add(headerKeys.has(key) ? 'PASS' : 'FAIL', `Security header configured: ${key}`)
      if (!headerKeys.has('content-security-policy')) {
        add('WARN', 'Content-Security-Policy not enforced', 'Current site uses several external assets; add CSP after final asset allowlist/localization.')
      }
    } catch (err) {
      add('FAIL', 'vercel.json parses as JSON', err.message)
    }
  }

  const sourceFiles = scanTextFiles()
  const placeholderPatterns = [
    [/example\.com/gi, 'example.com'],
    [/\blorem ipsum\b/gi, 'Lorem ipsum'],
    [/\bTODO\b/g, 'TODO'],
    [/\bFIXME\b/g, 'FIXME'],
    [/localhost:\d+/gi, 'localhost URL'],
  ]
  for (const [regex, label] of placeholderPatterns) {
    const hits = []
    for (const file of sourceFiles) {
      const txt = fs.readFileSync(file, 'utf8')
      if (regex.test(txt)) hits.push(path.relative(root, file).replaceAll('\\', '/'))
      regex.lastIndex = 0
    }
    add(hits.length ? 'WARN' : 'PASS', `Placeholder scan: ${label}`, hits.slice(0, 8).join(', '))
  }

  const sensitivePatterns = [
    [/-----BEGIN [A-Z ]*PRIVATE KEY-----/g, 'private key'],
    [/AKIA[0-9A-Z]{16}/g, 'AWS access key'],
    [/AIza[0-9A-Za-z_-]{30,}/g, 'Google API key'],
    [/gh[pousr]_[A-Za-z0-9_]{20,}/g, 'GitHub token'],
    [/sk_live_[0-9A-Za-z]{16,}/g, 'Stripe live secret'],
  ]
  for (const [regex, label] of sensitivePatterns) {
    const hits = []
    for (const file of sourceFiles) {
      const txt = fs.readFileSync(file, 'utf8')
      if (regex.test(txt)) hits.push(path.relative(root, file).replaceAll('\\', '/'))
      regex.lastIndex = 0
    }
    add(hits.length ? 'FAIL' : 'PASS', `Secret scan: ${label}`, hits.join(', '))
  }

  const forbiddenEnv = walk(root).filter((f) => {
    const rel = path.relative(root, f).replaceAll('\\', '/')
    return (rel.startsWith('public/') || rel.startsWith('src/') || rel.startsWith('dist/')) && /(^|\/)\.env(\.|$)/.test(rel)
  })
  add(forbiddenEnv.length ? 'FAIL' : 'PASS', 'No .env files inside src/public/dist', forbiddenEnv.map((f) => path.relative(root, f)).join(', '))

  const insecureHits = []
  for (const file of sourceFiles) {
    const rel = path.relative(root, file).replaceAll('\\', '/')
    const txt = fs.readFileSync(file, 'utf8')
    const matches = [...txt.matchAll(/http:\/\/(?!www\.sitemaps\.org)[^\s"'<>]+/g)]
    if (matches.length) insecureHits.push(`${rel}: ${matches[0][0]}`)
  }
  add(insecureHits.length ? 'FAIL' : 'PASS', 'No insecure http:// production resources', insecureHits.slice(0, 8).join(' | '))

  if (exists('src/i18n/locales/ar.json') && exists('src/i18n/locales/en.json')) {
    try {
      const ar = flatten(JSON.parse(read('src/i18n/locales/ar.json')))
      const en = flatten(JSON.parse(read('src/i18n/locales/en.json')))
      const used = new Set()
      for (const file of sourceFiles.filter((f) => /src[\\/].*\.(ts|tsx)$/.test(f))) {
        const txt = fs.readFileSync(file, 'utf8')
        for (const m of txt.matchAll(/\bt\(\s*['"]([^'"]+)['"]/g)) used.add(m[1])
      }
      const missingAr = [...used].filter((k) => !ar.has(k))
      const missingEn = [...used].filter((k) => !en.has(k))
      add(missingAr.length ? 'FAIL' : 'PASS', 'Arabic static translation keys complete', missingAr.join(', '))
      add(missingEn.length ? 'FAIL' : 'PASS', 'English static translation keys complete', missingEn.join(', '))
    } catch (err) {
      add('FAIL', 'Translation JSON parses correctly', err.message)
    }
  }

  const localAssetRefs = new Map()
  for (const file of sourceFiles) {
    const txt = fs.readFileSync(file, 'utf8')
    for (const m of txt.matchAll(/['"](\/[^'"?#]+\.(?:png|jpe?g|webp|gif|svg|mp4|webm|ico|pdf))['"]/gi)) {
      localAssetRefs.set(m[1], path.relative(root, file).replaceAll('\\', '/'))
    }
  }
  const missingAssets = [...localAssetRefs.entries()].filter(([asset]) => !exists(`public${asset}`))
  add(missingAssets.length ? 'FAIL' : 'PASS', 'Referenced public assets exist', missingAssets.slice(0, 12).map(([a, f]) => `${a} (${f})`).join(', '))

  if (exists('public/sitemap.xml')) {
    const sitemap = read('public/sitemap.xml')
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
    const relative = locs.filter((u) => !/^https:\/\//i.test(u))
    add(relative.length ? 'WARN' : 'PASS', 'Sitemap uses absolute HTTPS URLs', relative.join(', '))
  }

  if (exists('public/robots.txt')) {
    const robots = read('public/robots.txt')
    add(/Sitemap:\s*https:\/\//i.test(robots) ? 'PASS' : 'WARN', 'robots.txt has absolute HTTPS sitemap URL')
  }

  const contentWarnings = [
    ['since 1998', 'Legacy “since 1998” claim'],
    ['27 years', 'Legacy “27 years” claim'],
    ['27 عاماً', 'Legacy Arabic “27 years” claim'],
    ['25 countries', 'Legacy “25 countries” claim'],
    ['25 دولة', 'Legacy Arabic “25 countries” claim'],
    ['Singapore', 'Possible demo expansion/news claim'],
    ['سنغافورة', 'Possible Arabic demo expansion/news claim'],
    ['example.com', 'Example partner website'],
  ]
  for (const [needle, label] of contentWarnings) {
    const hits = []
    for (const file of sourceFiles) {
      const txt = fs.readFileSync(file, 'utf8')
      if (txt.toLowerCase().includes(needle.toLowerCase())) hits.push(path.relative(root, file).replaceAll('\\', '/'))
    }
    if (hits.length) add('WARN', `Manual content review: ${label}`, hits.slice(0, 6).join(', '))
  }
}

function distChecks() {
  console.log('\n========== BUILD OUTPUT ==========' )
  if (!exists('dist/index.html')) {
    add('FAIL', 'dist/index.html exists', 'Run npm run build first.')
    return
  }
  add('PASS', 'dist/index.html exists')

  const distFiles = walk(path.join(root, 'dist'))
  const maps = distFiles.filter((f) => f.endsWith('.map'))
  add(maps.length ? 'WARN' : 'PASS', 'No production source maps', maps.map((f) => path.relative(root, f)).join(', '))

  const huge = distFiles
    .map((f) => ({ f, size: fs.statSync(f).size }))
    .filter((x) => x.size > 5 * 1024 * 1024)
  add(huge.length ? 'WARN' : 'PASS', 'No local production file over 5 MB', huge.map((x) => `${path.relative(root, x.f)} ${(x.size / 1024 / 1024).toFixed(1)}MB`).join(', '))

  const sensitive = []
  for (const file of distFiles) {
    const buf = fs.readFileSync(file)
    if (!isLikelyText(buf)) continue
    const txt = buf.toString('utf8')
    if (/-----BEGIN [A-Z ]*PRIVATE KEY-----|AKIA[0-9A-Z]{16}|sk_live_[0-9A-Za-z]{16,}/.test(txt)) {
      sensitive.push(path.relative(root, file).replaceAll('\\', '/'))
    }
  }
  add(sensitive.length ? 'FAIL' : 'PASS', 'No obvious secrets in dist bundle', sensitive.join(', '))
}

function npmSecurityAudit() {
  console.log('\n========== DEPENDENCY SECURITY ==========' )
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const res = spawnSync(npm, ['audit', '--omit=dev', '--json'], { cwd: root, encoding: 'utf8', shell: process.platform === 'win32', timeout: 90000 })
  if (!res.stdout) {
    add('WARN', 'npm audit could not be evaluated', (res.stderr || 'No output').trim().slice(0, 300))
    return
  }
  try {
    const data = JSON.parse(res.stdout)
    const v = data.metadata?.vulnerabilities ?? {}
    const high = Number(v.high || 0)
    const critical = Number(v.critical || 0)
    if (high || critical) add('FAIL', 'Production dependency audit', `${critical} critical, ${high} high`)
    else add('PASS', 'Production dependency audit', `${v.total ?? 0} total; no high/critical runtime vulnerabilities`)
  } catch {
    add('WARN', 'npm audit returned non-JSON output', (res.stdout || res.stderr).trim().slice(0, 300))
  }
}

function findChrome() {
  const candidates = []
  if (process.platform === 'win32') {
    if (process.env.PROGRAMFILES) candidates.push(path.join(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'))
    if (process.env['PROGRAMFILES(X86)']) candidates.push(path.join(process.env['PROGRAMFILES(X86)'], 'Google/Chrome/Application/chrome.exe'))
    if (process.env.LOCALAPPDATA) {
      candidates.push(path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'))
      candidates.push(path.join(process.env.LOCALAPPDATA, 'Microsoft/Edge/Application/msedge.exe'))
    }
    if (process.env.PROGRAMFILES) candidates.push(path.join(process.env.PROGRAMFILES, 'Microsoft/Edge/Application/msedge.exe'))
  } else if (process.platform === 'darwin') {
    candidates.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    candidates.push('/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge')
  } else {
    candidates.push('/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser')
  }
  return candidates.find((p) => fs.existsSync(p))
}

async function waitForServer(url, ms = 20000) {
  const start = Date.now()
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url)
      if (r.ok) return true
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

async function browserSmoke() {
  console.log('\n========== BROWSER SMOKE TEST ==========' )
  const chrome = findChrome()
  if (!chrome) {
    add('WARN', 'Chrome/Edge browser smoke test skipped', 'Browser executable not found.')
    return
  }

  let puppeteer
  try {
    puppeteer = (await import('puppeteer-core')).default
  } catch (err) {
    add('WARN', 'Puppeteer smoke test skipped', err.message)
    return
  }

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const preview = spawn(npm, ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  })

  try {
    if (!(await waitForServer('http://127.0.0.1:4173/', 25000))) {
      add('FAIL', 'Vite production preview starts', 'Could not reach http://127.0.0.1:4173/')
      return
    }
    add('PASS', 'Vite production preview starts')

    const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const routes = ['/', '/gallery', '/projects', '/certificates', '/partners', '/contact', '/route-that-does-not-exist']
    const viewports = [
      { name: 'mobile', width: 390, height: 844 },
      { name: 'desktop', width: 1440, height: 900 },
    ]
    const languages = ['ar', 'en']

    for (const lang of languages) {
      for (const viewport of viewports) {
        for (const route of routes) {
          const page = await browser.newPage()
          await page.setViewport({ width: viewport.width, height: viewport.height })
          const consoleErrors = []
          const pageErrors = []
          const failedLocal = []
          page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
          page.on('pageerror', (e) => pageErrors.push(e.message))
          page.on('requestfailed', (req) => {
            try {
              const u = new URL(req.url())
              if (u.hostname === '127.0.0.1') failedLocal.push(`${u.pathname}: ${req.failure()?.errorText || 'failed'}`)
            } catch {}
          })

          await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 30000 })
          await page.evaluate((lng) => localStorage.setItem('app-language', lng), lang)
          await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
          await new Promise((r) => setTimeout(r, 1200))

          const state = await page.evaluate(() => {
            const text = document.body?.innerText || ''
            const raw = text.match(/\b(?:site|header|footer|hero|about|services|projects|gallery|certificates|partners|clients|contact|industries|common)\.[A-Za-z0-9_.-]+\b/g) || []
            const brokenImages = [...document.images]
              .filter((img) => img.complete && img.naturalWidth === 0)
              .map((img) => img.getAttribute('src') || '')
            return {
              overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
              lang: document.documentElement.lang,
              dir: document.documentElement.dir,
              rawKeys: [...new Set(raw)].slice(0, 12),
              brokenImages: brokenImages.slice(0, 12),
            }
          })

          const tag = `${lang}/${viewport.name}${route}`
          if (pageErrors.length) add('FAIL', `Runtime JS: ${tag}`, pageErrors.slice(0, 3).join(' | '))
          else add('PASS', `Runtime JS: ${tag}`)

          if (failedLocal.length) add('FAIL', `Local resources: ${tag}`, failedLocal.slice(0, 4).join(' | '))
          if (state.overflowX) add('FAIL', `Horizontal overflow: ${tag}`)
          if (state.rawKeys.length) add('FAIL', `Raw i18n keys visible: ${tag}`, state.rawKeys.join(', '))
          if (state.brokenImages.length) add('WARN', `Broken images: ${tag}`, state.brokenImages.join(', '))
          if (state.lang !== lang || state.dir !== (lang === 'ar' ? 'rtl' : 'ltr')) {
            add('FAIL', `HTML lang/dir: ${tag}`, `lang=${state.lang || '(empty)'}, dir=${state.dir || '(empty)'}`)
          }
          if (consoleErrors.length) add('WARN', `Console errors: ${tag}`, consoleErrors.slice(0, 3).join(' | '))

          await page.close()
        }
      }
    }
    await browser.close()
  } catch (err) {
    add('FAIL', 'Browser smoke test crashed', err.stack || err.message)
  } finally {
    if (preview?.pid) {
      if (process.platform === 'win32') {
        spawnSync('taskkill', ['/pid', String(preview.pid), '/T', '/F'], { stdio: 'ignore', shell: true })
      } else {
        try { preview.kill('SIGTERM') } catch {}
      }
    }
  }
}

async function main() {
  console.log('MM Contracting — Production Handoff Audit')
  console.log(`Node: ${process.version} | OS: ${os.platform()} ${os.arch()}`)
  console.log(`Project: ${root}`)

  await sourceChecks()
  distChecks()
  npmSecurityAudit()
  await browserSmoke()

  const counts = {
    pass: results.filter((r) => r.level === 'PASS').length,
    warn: results.filter((r) => r.level === 'WARN').length,
    fail: results.filter((r) => r.level === 'FAIL').length,
  }

  const report = {
    generatedAt: new Date().toISOString(),
    project: root,
    node: process.version,
    platform: `${os.platform()} ${os.arch()}`,
    counts,
    status: counts.fail ? 'FAIL' : counts.warn ? 'PASS_WITH_WARNINGS' : 'PASS',
    results,
  }
  fs.writeFileSync(path.join(root, 'production-audit-report.json'), JSON.stringify(report, null, 2))
  fs.writeFileSync(
    path.join(root, 'production-audit-report.txt'),
    results.map((r) => `${r.level}\t${r.check}${r.details ? `\t${r.details}` : ''}`).join('\n') + `\n\nSTATUS\t${report.status}\nPASS\t${counts.pass}\nWARN\t${counts.warn}\nFAIL\t${counts.fail}\n`
  )

  console.log('\n========== FINAL RESULT ==========' )
  console.log(`PASS: ${counts.pass} | WARN: ${counts.warn} | FAIL: ${counts.fail}`)
  console.log(`STATUS: ${report.status}`)
  console.log('Reports: production-audit-report.txt + production-audit-report.json')

  if (counts.fail) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
