const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to About page...');
    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Set desktop viewport first
    await page.setViewport({ width: 1280, height: 1024 });

    // Wait for the team section to load
    await page.waitForSelector('h2', { timeout: 10000 });

    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Taking full team section screenshot...');

    // Try to find the team section
    const teamSection = await page.evaluate(() => {
      // Look for the Our Team heading
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const teamHeading = headings.find(h => h.textContent.includes('Team'));

      if (teamHeading) {
        // Get the parent section
        let section = teamHeading.closest('section') || teamHeading.parentElement;
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

    if (teamSection) {
      await page.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/team-section-full.png',
        clip: {
          x: Math.max(0, teamSection.x),
          y: Math.max(0, teamSection.y),
          width: Math.min(1280, teamSection.width),
          height: Math.min(1024, teamSection.height)
        }
      });
      console.log('Team section screenshot saved');
    } else {
      // Take full page screenshot if we can't find the section
      await page.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/about-page-full.png',
        fullPage: true
      });
      console.log('Full page screenshot saved');
    }

    // Try to find Dr. Carmenatty's card specifically
    const carmenattyCard = await page.evaluate(() => {
      // Find all text that mentions "Carmenatty"
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.includes('Carmenatty')) {
          // Find the parent card element
          let card = node.parentElement;
          while (card && !card.classList.contains('card') && card.tagName !== 'ARTICLE' && card.tagName !== 'SECTION') {
            card = card.parentElement;
          }

          if (card) {
            const rect = card.getBoundingClientRect();
            return {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            };
          }
        }
      }
      return null;
    });

    if (carmenattyCard) {
      console.log('Taking Dr. Carmenatty card screenshot...');
      await page.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/carmenatty-card-closeup.png',
        clip: {
          x: Math.max(0, carmenattyCard.x - 20),
          y: Math.max(0, carmenattyCard.y - 20),
          width: Math.min(1280, carmenattyCard.width + 40),
          height: Math.min(1024, carmenattyCard.height + 40)
        }
      });
      console.log('Dr. Carmenatty card screenshot saved');
    }

    // Get image analysis data
    const imageAnalysis = await page.evaluate(() => {
      const results = [];

      // Find all images in the team section
      const images = Array.from(document.querySelectorAll('img'));

      images.forEach((img, index) => {
        // Check if this is a team member image
        const isTeamImage = img.alt && (
          img.alt.includes('Carmenatty') ||
          img.alt.includes('Wilson') ||
          img.alt.includes('Vasquez') ||
          img.alt.toLowerCase().includes('team')
        );

        if (isTeamImage || index < 5) { // Get first 5 images or team images
          const rect = img.getBoundingClientRect();
          const computed = window.getComputedStyle(img);

          results.push({
            alt: img.alt,
            src: img.src,
            dimensions: {
              displayWidth: rect.width,
              displayHeight: rect.height,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight
            },
            position: {
              x: rect.x,
              y: rect.y
            },
            styling: {
              objectFit: computed.objectFit,
              objectPosition: computed.objectPosition,
              borderRadius: computed.borderRadius
            },
            visible: rect.width > 0 && rect.height > 0
          });
        }
      });

      return results;
    });

    console.log('\n=== IMAGE ANALYSIS ===');
    console.log(JSON.stringify(imageAnalysis, null, 2));

    // Check console for errors
    const errors = await page.evaluate(() => {
      const errors = [];
      // Check if there are any visible error messages
      const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"]');
      errorElements.forEach(el => {
        if (el.offsetParent !== null) { // is visible
          errors.push(el.textContent);
        }
      });
      return errors;
    });

    if (errors.length > 0) {
      console.log('\n=== PAGE ERRORS ===');
      console.log(errors);
    }

    console.log('\n✓ Screenshots captured successfully');
    console.log('Files created:');
    console.log('  - team-section-full.png');
    console.log('  - about-page-full.png (fallback)');
    console.log('  - carmenatty-card-closeup.png');

  } catch (error) {
    console.error('Error during testing:', error);

    // Take error screenshot
    await page.screenshot({
      path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/error-screenshot.png',
      fullPage: true
    });
    console.log('Error screenshot saved to error-screenshot.png');
  } finally {
    await browser.close();
  }
})();
