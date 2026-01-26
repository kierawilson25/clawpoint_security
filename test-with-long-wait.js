const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to About page...');
    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('Waiting for images to load (15 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 15000));

    console.log('\nTaking screenshots...');

    // Full page screenshot
    await page.screenshot({
      path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/about-page-long-wait.png',
      fullPage: true
    });
    console.log('✓ Full page screenshot saved');

    // Team section screenshot
    const teamBounds = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2')).find(h =>
        h.textContent.includes('MEET THE TEAM')
      );

      if (heading) {
        const section = heading.closest('section');
        const rect = section.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }
      return null;
    });

    if (teamBounds) {
      await page.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/team-section-long-wait.png',
        clip: {
          x: Math.max(0, teamBounds.x),
          y: Math.max(0, teamBounds.y),
          width: Math.min(1280, teamBounds.width),
          height: Math.min(800, teamBounds.height)
        }
      });
      console.log('✓ Team section screenshot saved');
    }

    // Check image status
    const imageStatus = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]');
      return Array.from(imgs).map(img => ({
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        src: img.src
      }));
    });

    console.log('\n=== IMAGE STATUS AFTER 15 SECONDS ===');
    imageStatus.forEach(img => {
      console.log(`${img.alt}:`);
      console.log(`  complete: ${img.complete}`);
      console.log(`  natural: ${img.naturalWidth}x${img.naturalHeight}`);
      console.log(`  src: ${img.src}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
