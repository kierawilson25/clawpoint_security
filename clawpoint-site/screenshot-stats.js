const puppeteer = require('puppeteer');
const path = require('path');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  try {
    const page = await browser.newPage();

    // Try to find the right port
    let foundPort = null;
    for (const port of [3000, 3001, 3002]) {
      try {
        await page.goto(`http://localhost:${port}`, {
          waitUntil: 'networkidle0',
          timeout: 5000
        });

        const title = await page.title();
        const content = await page.content();

        if (content.includes('CLAWPOINT') || content.includes('Clawpoint')) {
          foundPort = port;
          console.log(`✓ Found Clawpoint site on port ${port}`);
          break;
        }
      } catch (e) {
        console.log(`Port ${port} not accessible or timed out`);
      }
    }

    if (!foundPort) {
      throw new Error('Could not find Clawpoint site on any port');
    }

    // Wait a bit for animations to settle
    await delay(2000);

    // Screenshot 1: Full page
    await page.screenshot({
      path: path.join(__dirname, '../stats-section-full-desktop.png'),
      fullPage: true
    });
    console.log('✓ Full page screenshot saved');

    // Screenshot 2: Stats section only (desktop)
    const statsSection = await page.$('section[aria-labelledby="credentials-heading"]');
    if (statsSection) {
      await statsSection.screenshot({
        path: path.join(__dirname, '../stats-section-only-desktop.png')
      });
      console.log('✓ Stats section screenshot saved (desktop)');
    }

    // Screenshot 3: Mobile viewport (375px)
    await page.setViewport({
      width: 375,
      height: 812
    });

    await page.reload({
      waitUntil: 'networkidle0'
    });

    await delay(2000);

    // Full page mobile
    await page.screenshot({
      path: path.join(__dirname, '../stats-section-mobile-full.png'),
      fullPage: true
    });
    console.log('✓ Mobile full page screenshot saved');

    // Stats section mobile
    const statsSectionMobile = await page.$('section[aria-labelledby="credentials-heading"]');
    if (statsSectionMobile) {
      await statsSectionMobile.screenshot({
        path: path.join(__dirname, '../stats-section-only-mobile.png')
      });
      console.log('✓ Stats section screenshot saved (mobile)');
    }

    // Screenshot 4: Tablet viewport (768px)
    await page.setViewport({
      width: 768,
      height: 1024
    });

    await page.reload({
      waitUntil: 'networkidle0'
    });

    await delay(2000);

    const statsSectionTablet = await page.$('section[aria-labelledby="credentials-heading"]');
    if (statsSectionTablet) {
      await statsSectionTablet.screenshot({
        path: path.join(__dirname, '../stats-section-only-tablet.png')
      });
      console.log('✓ Stats section screenshot saved (tablet)');
    }

    console.log('\n✓ All screenshots captured successfully!');

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
})();
