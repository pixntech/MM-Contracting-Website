import puppeteer from 'puppeteer-core'

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE_URL = 'http://localhost:5173'

const SECTIONS = [
  'Hero',
  'About',
  'VisionMission',
  'Statistics',
  'Services',
  'FeaturedProjects',
  'WhyChooseUs',
  'CompanyHistory',
  'Industries',
  'Partners',
  'Clients',
  'LatestNews',
  'Certificates',
  'Gallery',
  'Contact',
  'Map',
]

async function waitForStable(page, ms = 3000) {
  await new Promise((r) => setTimeout(r, ms))
}

async function checkOverflow(page) {
  return page.evaluate(() => {
    const sw = document.documentElement.scrollWidth
    const cw = document.documentElement.clientWidth
    const sh = document.documentElement.scrollHeight
    const ch = document.documentElement.clientHeight
    return {
      scrollWidth: sw,
      clientWidth: cw,
      scrollHeight: sh,
      clientHeight: ch,
      overflowX: sw > cw,
      overflowY: sh > ch,
    }
  })
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 }) // iPhone 14 size

  const results = []

  for (let i = 0; i < SECTIONS.length; i++) {
    const active = SECTIONS.slice(0, i + 1)
    const query = active.join(',')
    const url = `${BASE_URL}/?sections=${query}`

    console.log(`\n--- Testing: [${i + 1}/${SECTIONS.length}] ${active.join(' → ')}`)

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait for React hydration, lazy chunks, and Framer Motion to settle
    await waitForStable(page, 4000)

    const result = await checkOverflow(page)
    results.push({ section: active[active.length - 1], ...result })

    console.log(`  scrollWidth:  ${result.scrollWidth}px`)
    console.log(`  clientWidth:  ${result.clientWidth}px`)
    console.log(`  scrollHeight: ${result.scrollHeight}px`)
    console.log(`  clientHeight: ${result.clientHeight}px`)
    console.log(`  overflowX:    ${result.overflowX}`)

    // Wait for images/animations
    await waitForStable(page, 1500)

    const result2 = await checkOverflow(page)
    console.log(`  [re-check] overflowX: ${result2.overflowX}`)
    if (result2.overflowX) {
      results[results.length - 1].recheckOverflowX = true
    }
  }

  console.log('\n\n========== RESULTS ==========')
  console.log('Viewport: 390x844 (iPhone 14)')
  for (const r of results) {
    const icon = r.overflowX ? '❌ OVERFLOW' : '✅ OK'
    console.log(`  ${icon}  ${r.section.padEnd(20)}  sw=${r.scrollWidth} cw=${r.clientWidth}`)
  }

  // Find first overflow
  const firstBad = results.find((r) => r.overflowX)
  if (firstBad) {
    console.log(`\n🚨 FIRST OVERFLOW SOURCE: "${firstBad.section}" (scrollWidth=${firstBad.scrollWidth}px > clientWidth=${firstBad.clientWidth}px)`)
  } else {
    console.log('\n✅ No overflow detected.')
  }

  await browser.close()
}

run().catch((err) => {
  console.error('Test failed:', err)
  process.exit(1)
})
