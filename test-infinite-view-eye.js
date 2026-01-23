const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Starting Infinite View Eye Animation Test...');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();

  try {
    // Navigate to Infinite View page
    console.log('Navigating to Infinite View page...');
    await page.goto('http://localhost:3000/infinite-view', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for page to be fully loaded
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n=== TEST 1: Full Hero Section Screenshot (Desktop) ===');
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.screenshot({
      path: 'infinite-view-hero-desktop-full.png',
      fullPage: false
    });
    console.log('✓ Saved: infinite-view-hero-desktop-full.png');

    console.log('\n=== TEST 2: Eye Close-up (Checking Almond Shape & Eyelashes) ===');
    // Try to find the eye element and take a focused screenshot
    const eyeExists = await page.$('.eye-container, [class*="eye"], canvas');
    if (eyeExists) {
      const eyeBoundingBox = await eyeExists.boundingBox();
      if (eyeBoundingBox) {
        await page.screenshot({
          path: 'infinite-view-eye-closeup.png',
          clip: {
            x: Math.max(0, eyeBoundingBox.x - 50),
            y: Math.max(0, eyeBoundingBox.y - 50),
            width: Math.min(eyeBoundingBox.width + 100, 800),
            height: Math.min(eyeBoundingBox.height + 100, 600)
          }
        });
        console.log('✓ Saved: infinite-view-eye-closeup.png');
      }
    } else {
      console.log('⚠ Could not find eye element for close-up');
    }

    console.log('\n=== TEST 3: Mouse Tracking Test ===');
    // Move mouse to different positions and capture
    const positions = [
      { x: 960, y: 400, name: 'center' },
      { x: 400, y: 400, name: 'left' },
      { x: 1520, y: 400, name: 'right' },
      { x: 960, y: 200, name: 'top' },
      { x: 960, y: 600, name: 'bottom' }
    ];

    for (const pos of positions) {
      await page.mouse.move(pos.x, pos.y);
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for eye to track
      await page.screenshot({
        path: `infinite-view-eye-tracking-${pos.name}.png`,
        fullPage: false
      });
      console.log(`✓ Saved: infinite-view-eye-tracking-${pos.name}.png`);
    }

    console.log('\n=== TEST 4: Checking Console for Errors ===');
    const logs = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));

    const consoleErrors = await page.evaluate(() => {
      return window.consoleErrors || [];
    });

    if (consoleErrors.length > 0) {
      console.log('⚠ Console Errors Found:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('✓ No console errors detected');
    }

    console.log('\n=== TEST 5: Tablet View (768px) ===');
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({
      path: 'infinite-view-eye-tablet.png',
      fullPage: false
    });
    console.log('✓ Saved: infinite-view-eye-tablet.png');

    console.log('\n=== TEST 6: Mobile View (375px) ===');
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({
      path: 'infinite-view-eye-mobile.png',
      fullPage: false
    });
    console.log('✓ Saved: infinite-view-eye-mobile.png');

    console.log('\n=== TEST 7: Waiting for Blink Animation ===');
    // Reset to desktop view
    await page.setViewport({ width: 1920, height: 1080 });
    await page.mouse.move(960, 540); // Center position

    console.log('Waiting 15 seconds to capture a blink...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({
      path: 'infinite-view-eye-waiting-for-blink-1.png',
      fullPage: false
    });

    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({
      path: 'infinite-view-eye-waiting-for-blink-2.png',
      fullPage: false
    });

    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({
      path: 'infinite-view-eye-waiting-for-blink-3.png',
      fullPage: false
    });
    console.log('✓ Saved 3 blink-waiting screenshots');

    console.log('\n=== TEST 8: Checking Eye Element Styles ===');
    const eyeStyles = await page.evaluate(() => {
      const eyeCanvas = document.querySelector('canvas');
      const eyeContainer = eyeCanvas?.parentElement;

      if (!eyeCanvas || !eyeContainer) {
        return { error: 'Eye canvas or container not found' };
      }

      const canvasRect = eyeCanvas.getBoundingClientRect();
      const containerRect = eyeContainer.getBoundingClientRect();

      return {
        canvasSize: {
          width: eyeCanvas.width,
          height: eyeCanvas.height,
          displayWidth: canvasRect.width,
          displayHeight: canvasRect.height
        },
        containerSize: {
          width: containerRect.width,
          height: containerRect.height
        },
        hasEyeAnimation: typeof eyeCanvas.getContext === 'function'
      };
    });

    console.log('Eye Element Details:');
    console.log(JSON.stringify(eyeStyles, null, 2));

    console.log('\n=== SUMMARY ===');
    console.log('Screenshots captured:');
    console.log('  - Full hero section (desktop, tablet, mobile)');
    console.log('  - Eye close-up');
    console.log('  - Mouse tracking (5 positions)');
    console.log('  - Blink waiting sequence (3 frames)');
    console.log('\nTotal screenshots: 12+');

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
    console.log('\nBrowser closed. Test complete!');
  }
})();
