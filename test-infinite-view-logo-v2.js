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

  console.log('='.repeat(70));
  console.log('INFINITE VIEW LOGO VERIFICATION TEST');
  console.log('='.repeat(70));
  console.log('\nTesting URL:', baseUrl);
  console.log('\n');

  try {
    // Test 1: Desktop Hero Section
    console.log('TEST 1: Desktop Hero Section Logo');
    console.log('-'.repeat(70));
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations to settle

    // Get hero logo info
    const heroLogoInfo = await page.evaluate(() => {
      const logoContainer = document.querySelector('.max-w-xl.animate-pulse-slow');
      const logoImage = document.querySelector('.max-w-xl.animate-pulse-slow img');

      if (!logoContainer || !logoImage) {
        return { found: false };
      }

      const containerRect = logoContainer.getBoundingClientRect();
      const imageRect = logoImage.getBoundingClientRect();
      const containerStyles = window.getComputedStyle(logoContainer);
      const imageStyles = window.getComputedStyle(logoImage);

      // Check for tactical corners
      const corners = logoContainer.parentElement.querySelectorAll('.absolute.border-t-2, .absolute.border-b-2');

      return {
        found: true,
        container: {
          width: Math.round(containerRect.width),
          height: Math.round(containerRect.height),
          maxWidth: containerStyles.maxWidth,
          className: logoContainer.className
        },
        image: {
          width: Math.round(imageRect.width),
          height: Math.round(imageRect.height),
          naturalWidth: logoImage.naturalWidth,
          naturalHeight: logoImage.naturalHeight
        },
        tacticalCorners: {
          found: corners.length > 0,
          count: corners.length
        },
        animation: {
          hasAnimation: containerStyles.animation !== 'none' && containerStyles.animation !== '',
          animationValue: containerStyles.animation
        }
      };
    });

    if (heroLogoInfo.found) {
      console.log('✓ Hero logo found');
      console.log('  Container dimensions:', `${heroLogoInfo.container.width}px × ${heroLogoInfo.container.height}px`);
      console.log('  Container max-width:', heroLogoInfo.container.maxWidth);
      console.log('  Image dimensions:', `${heroLogoInfo.image.width}px × ${heroLogoInfo.image.height}px`);
      console.log('  Image natural size:', `${heroLogoInfo.image.naturalWidth}px × ${heroLogoInfo.image.naturalHeight}px`);
      console.log('  Animation present:', heroLogoInfo.animation.hasAnimation ? '✓ YES' : '✗ NO');
      if (heroLogoInfo.animation.hasAnimation) {
        console.log('  Animation details:', heroLogoInfo.animation.animationValue);
      }
      console.log('  Tactical corners:', heroLogoInfo.tacticalCorners.found ? `✓ YES (${heroLogoInfo.tacticalCorners.count} corners)` : '✗ NO');
    } else {
      console.log('✗ Hero logo NOT found');
    }

    // Screenshot hero section
    await page.screenshot({
      path: path.join(screenshotDir, '01-desktop-hero-full.png'),
      fullPage: false
    });
    console.log('\n✓ Screenshot saved: 01-desktop-hero-full.png\n');

    // Test 2: What's Available Today Section Logo
    console.log('TEST 2: "What\'s Available Today" Section Logo');
    console.log('-'.repeat(70));

    await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2'))
        .find(el => el.textContent.includes("WHAT'S AVAILABLE TODAY"));
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    await page.waitForTimeout(1500);

    const availableLogoInfo = await page.evaluate(() => {
      const logoContainers = document.querySelectorAll('.animate-pulse-slow');

      // Get the second logo (in What's Available section)
      if (logoContainers.length < 2) {
        return { found: false };
      }

      const logoContainer = logoContainers[1];
      const logoImage = logoContainer.querySelector('img');

      if (!logoImage) {
        return { found: false };
      }

      const containerRect = logoContainer.getBoundingClientRect();
      const imageRect = logoImage.getBoundingClientRect();
      const containerStyles = window.getComputedStyle(logoContainer);

      return {
        found: true,
        container: {
          width: Math.round(containerRect.width),
          height: Math.round(containerRect.height),
          className: logoContainer.className
        },
        image: {
          width: Math.round(imageRect.width),
          height: Math.round(imageRect.height),
          opacity: window.getComputedStyle(logoImage).opacity
        },
        animation: {
          hasAnimation: containerStyles.animation !== 'none' && containerStyles.animation !== '',
          animationValue: containerStyles.animation
        }
      };
    });

    if (availableLogoInfo.found) {
      console.log('✓ "What\'s Available" logo found');
      console.log('  Container dimensions:', `${availableLogoInfo.container.width}px × ${availableLogoInfo.container.height}px`);
      console.log('  Image dimensions:', `${availableLogoInfo.image.width}px × ${availableLogoInfo.image.height}px`);
      console.log('  Image opacity:', availableLogoInfo.image.opacity);
      console.log('  Animation present:', availableLogoInfo.animation.hasAnimation ? '✓ YES' : '✗ NO');
    } else {
      console.log('✗ "What\'s Available" logo NOT found');
    }

    await page.screenshot({
      path: path.join(screenshotDir, '02-desktop-whats-available.png'),
      fullPage: false
    });
    console.log('\n✓ Screenshot saved: 02-desktop-whats-available.png\n');

    // Test 3: Mobile Hero (iPhone 14 Pro)
    console.log('TEST 3: Mobile Hero Section (iPhone 14 Pro - 390×844)');
    console.log('-'.repeat(70));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const mobileHeroInfo = await page.evaluate(() => {
      const logoContainer = document.querySelector('.max-w-xl.animate-pulse-slow');
      const logoImage = document.querySelector('.max-w-xl.animate-pulse-slow img');

      if (!logoContainer || !logoImage) {
        return { found: false };
      }

      const containerRect = logoContainer.getBoundingClientRect();
      const imageRect = logoImage.getBoundingClientRect();

      // Check tactical corners
      const corners = logoContainer.parentElement.querySelectorAll('.absolute.border-t-2, .absolute.border-b-2');

      return {
        found: true,
        container: {
          width: Math.round(containerRect.width),
          height: Math.round(containerRect.height)
        },
        image: {
          width: Math.round(imageRect.width),
          height: Math.round(imageRect.height)
        },
        tacticalCorners: {
          found: corners.length > 0,
          count: corners.length,
          visible: Array.from(corners).filter(c => {
            const rect = c.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          }).length
        }
      };
    });

    if (mobileHeroInfo.found) {
      console.log('✓ Mobile hero logo found');
      console.log('  Container dimensions:', `${mobileHeroInfo.container.width}px × ${mobileHeroInfo.container.height}px`);
      console.log('  Image dimensions:', `${mobileHeroInfo.image.width}px × ${mobileHeroInfo.image.height}px`);
      console.log('  Tactical corners visible:', `${mobileHeroInfo.tacticalCorners.visible}/${mobileHeroInfo.tacticalCorners.count}`);
    } else {
      console.log('✗ Mobile hero logo NOT found');
    }

    await page.screenshot({
      path: path.join(screenshotDir, '03-mobile-hero.png'),
      fullPage: false
    });
    console.log('\n✓ Screenshot saved: 03-mobile-hero.png\n');

    // Test 4: Mobile What's Available
    console.log('TEST 4: Mobile "What\'s Available Today" Section');
    console.log('-'.repeat(70));

    await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2'))
        .find(el => el.textContent.includes("WHAT'S AVAILABLE TODAY"));
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1500);

    const mobileAvailableInfo = await page.evaluate(() => {
      const logoContainers = document.querySelectorAll('.animate-pulse-slow');
      if (logoContainers.length < 2) {
        return { found: false };
      }

      const logoContainer = logoContainers[1];
      const logoImage = logoContainer.querySelector('img');

      if (!logoImage) {
        return { found: false };
      }

      const containerRect = logoContainer.getBoundingClientRect();
      const imageRect = logoImage.getBoundingClientRect();

      return {
        found: true,
        container: {
          width: Math.round(containerRect.width),
          height: Math.round(containerRect.height)
        },
        image: {
          width: Math.round(imageRect.width),
          height: Math.round(imageRect.height)
        }
      };
    });

    if (mobileAvailableInfo.found) {
      console.log('✓ Mobile "What\'s Available" logo found');
      console.log('  Container dimensions:', `${mobileAvailableInfo.container.width}px × ${mobileAvailableInfo.container.height}px`);
      console.log('  Image dimensions:', `${mobileAvailableInfo.image.width}px × ${mobileAvailableInfo.image.height}px`);
    }

    await page.screenshot({
      path: path.join(screenshotDir, '04-mobile-whats-available.png'),
      fullPage: false
    });
    console.log('\n✓ Screenshot saved: 04-mobile-whats-available.png\n');

    // Test 5: Full page screenshots for context
    console.log('TEST 5: Full Page Context Screenshots');
    console.log('-'.repeat(70));

    // Desktop full page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, '05-desktop-full-page.png'),
      fullPage: true
    });
    console.log('✓ Desktop full page screenshot saved');

    // Mobile full page
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, '06-mobile-full-page.png'),
      fullPage: true
    });
    console.log('✓ Mobile full page screenshot saved\n');

    // Summary
    console.log('='.repeat(70));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(70));
    console.log('\n✓ All tests completed successfully!');
    console.log(`\nScreenshots location: ${screenshotDir}`);
    console.log('\nKey Findings:');

    if (heroLogoInfo.found) {
      console.log(`  • Hero logo size: ${heroLogoInfo.container.width}px wide`);
      console.log(`  • Pulsing animation: ${heroLogoInfo.animation.hasAnimation ? 'Active ✓' : 'Not detected ✗'}`);
      console.log(`  • Tactical corners: ${heroLogoInfo.tacticalCorners.found ? 'Present ✓' : 'Missing ✗'}`);
    }

    if (availableLogoInfo.found) {
      console.log(`  • "What's Available" logo: ${availableLogoInfo.container.width}px wide`);
    }

    if (mobileHeroInfo.found) {
      console.log(`  • Mobile logo size: ${mobileHeroInfo.container.width}px wide`);
      console.log(`  • Mobile tactical corners visible: ${mobileHeroInfo.tacticalCorners.visible}/4`);
    }

    console.log('\n' + '='.repeat(70) + '\n');

  } catch (error) {
    console.error('\n❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
})();
