const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3000/infinite-view';
  const screenshotDir = path.join(__dirname, 'infinite-view-logo-tests');

  // Create screenshot directory
  const fs = require('fs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Starting Infinite View Logo Testing...\n');

  try {
    // Test 1: Desktop Hero Section
    console.log('1. Testing Desktop Hero Section...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations to settle

    // Take full hero section screenshot
    await page.screenshot({
      path: path.join(screenshotDir, '01-desktop-hero-section.png'),
      fullPage: false
    });
    console.log('   ✓ Screenshot saved: 01-desktop-hero-section.png');

    // Get logo dimensions
    const heroLogoSize = await page.evaluate(() => {
      const logo = document.querySelector('.eye-container');
      if (!logo) return null;
      const rect = logo.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        computedWidth: window.getComputedStyle(logo).width,
        computedHeight: window.getComputedStyle(logo).height
      };
    });

    if (heroLogoSize) {
      console.log('   ✓ Hero logo size:', heroLogoSize);
    } else {
      console.log('   ⚠ Could not find hero logo (.eye-container)');
    }

    // Test 2: Scroll to "What's Available Today" section
    console.log('\n2. Testing "What\'s Available Today" Section...');
    await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2, h3'))
        .find(el => el.textContent.includes("What's Available Today") ||
                    el.textContent.includes("What's Available"));
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(screenshotDir, '02-desktop-whats-available-section.png'),
      fullPage: false
    });
    console.log('   ✓ Screenshot saved: 02-desktop-whats-available-section.png');

    // Get logo in What's Available section
    const availableLogoSize = await page.evaluate(() => {
      const logos = document.querySelectorAll('.eye-container');
      if (logos.length > 1) {
        const rect = logos[1].getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          computedWidth: window.getComputedStyle(logos[1]).width,
          computedHeight: window.getComputedStyle(logos[1]).height
        };
      }
      return null;
    });

    if (availableLogoSize) {
      console.log('   ✓ Available section logo size:', availableLogoSize);
    }

    // Test 3: Full page screenshot for layout overview
    console.log('\n3. Taking full page screenshot...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotDir, '03-desktop-full-page.png'),
      fullPage: true
    });
    console.log('   ✓ Screenshot saved: 03-desktop-full-page.png');

    // Test 4: Mobile viewport (iPhone 14 Pro)
    console.log('\n4. Testing Mobile Viewport (iPhone 14 Pro - 390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(screenshotDir, '04-mobile-hero-section.png'),
      fullPage: false
    });
    console.log('   ✓ Screenshot saved: 04-mobile-hero-section.png');

    // Get mobile logo size
    const mobileLogoSize = await page.evaluate(() => {
      const logo = document.querySelector('.eye-container');
      if (!logo) return null;
      const rect = logo.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        computedWidth: window.getComputedStyle(logo).width,
        computedHeight: window.getComputedStyle(logo).height
      };
    });

    if (mobileLogoSize) {
      console.log('   ✓ Mobile hero logo size:', mobileLogoSize);
    }

    // Scroll to What's Available on mobile
    await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2, h3'))
        .find(el => el.textContent.includes("What's Available Today") ||
                    el.textContent.includes("What's Available"));
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(screenshotDir, '05-mobile-whats-available.png'),
      fullPage: false
    });
    console.log('   ✓ Screenshot saved: 05-mobile-whats-available.png');

    // Mobile full page
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotDir, '06-mobile-full-page.png'),
      fullPage: true
    });
    console.log('   ✓ Screenshot saved: 06-mobile-full-page.png');

    // Test 5: Check for pulsing animation
    console.log('\n5. Checking for pulsing animation...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const animationCheck = await page.evaluate(() => {
      const logo = document.querySelector('.eye-container');
      if (!logo) return { found: false };

      const styles = window.getComputedStyle(logo);
      const hasAnimation = styles.animation !== 'none' && styles.animation !== '';

      return {
        found: true,
        hasAnimation: hasAnimation,
        animationValue: styles.animation,
        className: logo.className
      };
    });

    console.log('   Animation check:', animationCheck);

    // Test 6: Check tactical corner brackets
    console.log('\n6. Checking tactical corner brackets...');
    const bracketsCheck = await page.evaluate(() => {
      const containers = document.querySelectorAll('.relative');
      let found = false;

      for (const container of containers) {
        const beforeStyle = window.getComputedStyle(container, '::before');
        const afterStyle = window.getComputedStyle(container, '::after');

        if (beforeStyle.content !== 'none' || afterStyle.content !== 'none') {
          found = true;
          break;
        }
      }

      return { found };
    });

    console.log('   Tactical brackets present:', bracketsCheck.found);

    // Test 7: Take screenshots at different animation states (if animation exists)
    if (animationCheck.hasAnimation) {
      console.log('\n7. Capturing animation states...');
      for (let i = 0; i < 3; i++) {
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: path.join(screenshotDir, `07-animation-state-${i + 1}.png`),
          fullPage: false,
          clip: { x: 0, y: 0, width: 1920, height: 800 }
        });
        console.log(`   ✓ Animation state ${i + 1} captured`);
      }
    }

    console.log('\n✅ All tests completed successfully!');
    console.log(`\nScreenshots saved to: ${screenshotDir}`);

  } catch (error) {
    console.error('\n❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
})();
