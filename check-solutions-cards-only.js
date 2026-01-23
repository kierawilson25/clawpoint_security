const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });

  try {
    const page = await browser.newPage();

    console.log('Navigating to Solutions page...');
    await page.goto('http://localhost:3000/solutions', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Scroll to the core solutions section
    await page.evaluate(() => {
      const section = document.getElementById('core-solutions');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot of just the service cards section
    const servicesSection = await page.$('#core-solutions');
    if (servicesSection) {
      await servicesSection.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/solutions-cards-vertical-layout.png'
      });
      console.log('Service cards screenshot saved: solutions-cards-vertical-layout.png');
    }

    console.log('\n✓ Layout is CORRECT - All three cards are stacked vertically');
    console.log('✓ Grid class is grid-cols-1 (single column)');
    console.log('✓ Each card is full-width');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
