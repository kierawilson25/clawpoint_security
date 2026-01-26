const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to About page...');

    // Set desktop viewport first
    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('Page loaded, waiting for images...');

    // Wait for team images to be present in the DOM
    await page.waitForSelector('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]', {
      timeout: 10000
    });

    // Wait additional time for Next.js Image optimization to complete
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n=== ANALYZING TEAM MEMBER IMAGES ===\n');

    // Get detailed image information
    const teamImages = await page.evaluate(() => {
      const results = [];

      // Find team member images by alt text
      const teamAlts = ['Will Smith', 'Dr. Edgar Carmenatty', 'Charles Walker'];

      teamAlts.forEach(name => {
        const img = document.querySelector(`img[alt="${name}"]`);

        if (img) {
          const rect = img.getBoundingClientRect();
          const computed = window.getComputedStyle(img);

          // Get the parent container
          const container = img.closest('[class*="aspect-square"]') || img.parentElement;
          const containerRect = container ? container.getBoundingClientRect() : null;

          results.push({
            name: name,
            src: img.src,
            currentSrc: img.currentSrc,
            alt: img.alt,
            dimensions: {
              natural: {
                width: img.naturalWidth,
                height: img.naturalHeight
              },
              display: {
                width: rect.width,
                height: rect.height
              },
              computed: {
                width: computed.width,
                height: computed.height
              }
            },
            position: {
              x: rect.x,
              y: rect.y,
              top: rect.top,
              bottom: rect.bottom
            },
            container: containerRect ? {
              width: containerRect.width,
              height: containerRect.height,
              x: containerRect.x,
              y: containerRect.y
            } : null,
            styling: {
              objectFit: computed.objectFit,
              objectPosition: computed.objectPosition,
              borderRadius: computed.borderRadius,
              opacity: computed.opacity,
              visibility: computed.visibility,
              display: computed.display
            },
            classes: img.className,
            visible: rect.width > 0 && rect.height > 0,
            complete: img.complete,
            error: img.error || false
          });
        } else {
          results.push({
            name: name,
            error: 'Image element not found in DOM'
          });
        }
      });

      return results;
    });

    teamImages.forEach(img => {
      console.log(`\n--- ${img.name} ---`);
      if (img.error && typeof img.error === 'string') {
        console.log(`ERROR: ${img.error}`);
      } else {
        console.log(`Alt: ${img.alt}`);
        console.log(`Source: ${img.src}`);
        console.log(`Natural dimensions: ${img.dimensions.natural.width} x ${img.dimensions.natural.height}`);
        console.log(`Display dimensions: ${img.dimensions.display.width} x ${img.dimensions.display.height}`);
        console.log(`Object fit: ${img.styling.objectFit}`);
        console.log(`Object position: ${img.styling.objectPosition}`);
        console.log(`Visibility: ${img.styling.visibility}`);
        console.log(`Display: ${img.styling.display}`);
        console.log(`Opacity: ${img.styling.opacity}`);
        console.log(`Complete: ${img.complete}`);
        console.log(`Visible: ${img.visible}`);
        console.log(`Classes: ${img.classes}`);

        if (img.container) {
          console.log(`Container: ${img.container.width} x ${img.container.height}`);
        }
      }
    });

    // Take screenshot of the entire team section
    console.log('\n\nTaking screenshots...');

    const teamSection = await page.evaluate(() => {
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

    if (teamSection) {
      await page.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/team-section-detailed.png',
        clip: {
          x: Math.max(0, teamSection.x),
          y: Math.max(0, teamSection.y),
          width: Math.min(1280, teamSection.width),
          height: Math.min(800, teamSection.height)
        }
      });
      console.log('✓ Team section screenshot saved: team-section-detailed.png');
    }

    // Take individual screenshots of each team member card
    for (const memberName of ['Will Smith', 'Dr. Edgar Carmenatty', 'Charles Walker']) {
      const cardBounds = await page.evaluate((name) => {
        const img = document.querySelector(`img[alt="${name}"]`);
        if (img) {
          // Find the parent article
          const article = img.closest('article');
          if (article) {
            const rect = article.getBoundingClientRect();
            return {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            };
          }
        }
        return null;
      }, memberName);

      if (cardBounds) {
        const filename = memberName.toLowerCase().replace(/[.\s]+/g, '-');
        await page.screenshot({
          path: `/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/${filename}-card.png`,
          clip: {
            x: Math.max(0, cardBounds.x - 5),
            y: Math.max(0, cardBounds.y - 5),
            width: Math.min(500, cardBounds.width + 10),
            height: Math.min(600, cardBounds.height + 10)
          }
        });
        console.log(`✓ ${memberName} card screenshot saved: ${filename}-card.png`);
      }
    }

    // Check browser console for errors
    const consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Check for network errors
    const failedRequests = [];
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        error: request.failure().errorText
      });
    });

    if (failedRequests.length > 0) {
      console.log('\n\n=== FAILED NETWORK REQUESTS ===');
      failedRequests.forEach(req => {
        console.log(`${req.url}: ${req.error}`);
      });
    }

    console.log('\n✓ Testing complete!');

  } catch (error) {
    console.error('Error during testing:', error);

    // Take error screenshot
    await page.screenshot({
      path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/error-screenshot-detailed.png',
      fullPage: true
    });
    console.log('Error screenshot saved to error-screenshot-detailed.png');
  } finally {
    await browser.close();
  }
})();
