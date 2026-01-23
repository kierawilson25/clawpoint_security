const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting detailed eye animation inspection...');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/infinite-view', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n=== Capturing Eye Details ===');

    // Find the eye container
    const eyeElement = await page.$('.w-72.h-56');

    if (eyeElement) {
      const boundingBox = await eyeElement.boundingBox();

      console.log('Eye element found at:', {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height
      });

      // Take a zoomed screenshot of just the eye area
      await page.screenshot({
        path: 'eye-extreme-closeup.png',
        clip: {
          x: Math.max(0, boundingBox.x - 100),
          y: Math.max(0, boundingBox.y - 100),
          width: boundingBox.width + 200,
          height: boundingBox.height + 200
        }
      });
      console.log('✓ Saved: eye-extreme-closeup.png');

      // Test different mouse positions with detailed captures
      const positions = [
        { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height / 2, name: 'center-detailed' },
        { x: boundingBox.x + 50, y: boundingBox.y + boundingBox.height / 2, name: 'left-detailed' },
        { x: boundingBox.x + boundingBox.width - 50, y: boundingBox.y + boundingBox.height / 2, name: 'right-detailed' },
        { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + 50, name: 'top-detailed' },
        { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height - 50, name: 'bottom-detailed' }
      ];

      for (const pos of positions) {
        await page.mouse.move(pos.x, pos.y);
        await new Promise(resolve => setTimeout(resolve, 800));

        await page.screenshot({
          path: `eye-tracking-${pos.name}.png`,
          clip: {
            x: Math.max(0, boundingBox.x - 100),
            y: Math.max(0, boundingBox.y - 100),
            width: boundingBox.width + 200,
            height: boundingBox.height + 200
          }
        });
        console.log(`✓ Saved: eye-tracking-${pos.name}.png`);
      }

      // Get computed styles
      const eyeStyles = await page.evaluate((selector) => {
        const eye = document.querySelector(selector);
        const pupil = eye?.querySelector('.absolute.inset-0.flex.items-center.justify-center');
        const eyelid = eye?.querySelector('.absolute.inset-0.bg-black.transition-all');

        if (!eye) return { error: 'Eye not found' };

        const eyeStyles = window.getComputedStyle(eye);
        const pupilStyles = pupil ? window.getComputedStyle(pupil) : null;
        const eyelidStyles = eyelid ? window.getComputedStyle(eyelid) : null;

        return {
          eye: {
            width: eyeStyles.width,
            height: eyeStyles.height,
            borderRadius: eyeStyles.borderRadius,
            border: eyeStyles.border,
            boxShadow: eyeStyles.boxShadow
          },
          pupil: pupilStyles ? {
            transform: pupilStyles.transform,
            transition: pupilStyles.transition
          } : null,
          eyelid: eyelidStyles ? {
            transform: eyelidStyles.transform,
            transition: eyelidStyles.transition
          } : null
        };
      }, '.w-72.h-56');

      console.log('\n=== Eye Component Styles ===');
      console.log(JSON.stringify(eyeStyles, null, 2));

      // Check for eyelashes
      const eyelashInfo = await page.evaluate(() => {
        const topLashes = document.querySelectorAll('[key^="top-"]');
        const bottomLashes = document.querySelectorAll('[key^="bottom-"]');

        return {
          topLashCount: topLashes.length,
          bottomLashCount: bottomLashes.length,
          hasEyelashes: topLashes.length > 0 || bottomLashes.length > 0
        };
      });

      console.log('\n=== Eyelash Detection ===');
      console.log(JSON.stringify(eyelashInfo, null, 2));

    } else {
      console.log('⚠ Could not find eye element');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
    console.log('\nTest complete!');
  }
})();
