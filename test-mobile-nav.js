const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// iPhone 14 Pro dimensions
const VIEWPORT = {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true
};

const NAV_BAR_HEIGHT = 96; // Expected nav bar height in pixels

async function testMobileNavigation() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: VIEWPORT,
    args: ['--window-size=390,844']
  });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // Create screenshots directory
  const screenshotDir = path.join(__dirname, 'mobile-nav-test-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const results = {
    timestamp: new Date().toISOString(),
    viewport: VIEWPORT,
    tests: []
  };

  console.log('\n🔍 Starting Mobile Navigation Tests - iPhone 14 Pro (390x844)');
  console.log('=' .repeat(70));

  // Test pages
  const testPages = [
    { url: 'http://localhost:3000/', name: 'home' },
    { url: 'http://localhost:3000/contact', name: 'contact' }
  ];

  for (const testPage of testPages) {
    console.log(`\n📱 Testing: ${testPage.name.toUpperCase()} PAGE`);
    console.log('-'.repeat(70));

    const pageResult = {
      page: testPage.name,
      url: testPage.url,
      tests: []
    };

    try {
      // Navigate to page
      await page.goto(testPage.url, { waitUntil: 'networkidle0', timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`✓ Navigated to ${testPage.url}`);

      // STEP 1: Capture menu closed state
      console.log('\n📸 Capturing: Menu Closed');
      await page.screenshot({
        path: path.join(screenshotDir, `${testPage.name}-menu-closed.png`),
        fullPage: false
      });
      console.log(`   Saved: ${testPage.name}-menu-closed.png`);

      // Check initial state
      const initialState = await page.evaluate(() => {
        const hamburger = document.querySelector('[aria-label="Toggle menu"]') ||
                         document.querySelector('button[class*="hamburger"]') ||
                         document.querySelector('button svg path[d*="M3 12h18"]')?.closest('button');
        const mobileMenu = document.querySelector('[class*="mobile"]') ||
                          document.getElementById('mobile-menu') ||
                          document.querySelector('nav + div') ||
                          document.querySelector('[role="dialog"]');

        return {
          hamburgerExists: !!hamburger,
          hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false,
          mobileMenuExists: !!mobileMenu,
          mobileMenuVisible: mobileMenu ? window.getComputedStyle(mobileMenu).display !== 'none' : false,
          mobileMenuClasses: mobileMenu ? mobileMenu.className : 'not found'
        };
      });

      pageResult.tests.push({
        test: 'Hamburger Menu Exists',
        passed: initialState.hamburgerExists,
        details: initialState
      });

      console.log(`\n🔍 Initial State:`);
      console.log(`   Hamburger exists: ${initialState.hamburgerExists ? '✓' : '✗'}`);
      console.log(`   Hamburger visible: ${initialState.hamburgerVisible ? '✓' : '✗'}`);
      console.log(`   Mobile menu exists: ${initialState.mobileMenuExists ? '✓' : '✗'}`);
      console.log(`   Mobile menu visible: ${initialState.mobileMenuVisible ? '✓' : '✗'}`);

      if (!initialState.hamburgerExists) {
        console.log('   ⚠️  WARNING: Hamburger menu not found!');
        pageResult.tests.push({
          test: 'Overall Mobile Nav Test',
          passed: false,
          reason: 'Hamburger menu button not found'
        });
        continue;
      }

      // STEP 2: Open the mobile menu
      console.log('\n🖱️  Opening Mobile Menu...');
      await page.evaluate(() => {
        const hamburger = document.querySelector('[aria-label="Toggle menu"]') ||
                         document.querySelector('button[class*="hamburger"]') ||
                         document.querySelector('button svg path[d*="M3 12h18"]')?.closest('button');
        if (hamburger) {
          hamburger.click();
        }
      });

      // Wait for menu animation
      await new Promise(resolve => setTimeout(resolve, 500));

      // STEP 3: Capture menu open state
      console.log('📸 Capturing: Menu Open');
      await page.screenshot({
        path: path.join(screenshotDir, `${testPage.name}-menu-open.png`),
        fullPage: false
      });
      console.log(`   Saved: ${testPage.name}-menu-open.png`);

      // STEP 4: Detailed overlay analysis
      const overlayAnalysis = await page.evaluate((navHeight) => {
        const mobileMenu = document.querySelector('[class*="mobile"]') ||
                          document.getElementById('mobile-menu') ||
                          document.querySelector('nav + div') ||
                          document.querySelector('[role="dialog"]');

        if (!mobileMenu) {
          return { error: 'Mobile menu element not found' };
        }

        const rect = mobileMenu.getBoundingClientRect();
        const styles = window.getComputedStyle(mobileMenu);

        // Check if there's any page content visible behind
        const pageContent = document.querySelector('main') || document.querySelector('.content');
        const contentRect = pageContent ? pageContent.getBoundingClientRect() : null;

        // Check for gaps
        const gapBetweenNavAndMenu = rect.top;
        const menuCoversContent = contentRect ? (rect.bottom >= contentRect.bottom || styles.position === 'fixed') : 'N/A';

        // Get all visible text behind menu (if any)
        const allElements = document.querySelectorAll('*');
        const visibleBehindMenu = [];

        allElements.forEach(el => {
          const elRect = el.getBoundingClientRect();
          const elStyles = window.getComputedStyle(el);
          const zIndex = parseInt(elStyles.zIndex) || 0;
          const menuZIndex = parseInt(styles.zIndex) || 0;

          // Check if element is behind menu and visible
          if (elRect.top > navHeight &&
              zIndex < menuZIndex &&
              elStyles.display !== 'none' &&
              elStyles.visibility !== 'hidden' &&
              elStyles.opacity !== '0' &&
              el.textContent.trim().length > 0 &&
              !mobileMenu.contains(el)) {
            visibleBehindMenu.push({
              tag: el.tagName,
              text: el.textContent.trim().substring(0, 50),
              zIndex: zIndex
            });
          }
        });

        return {
          menuFound: true,
          position: {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height
          },
          styles: {
            position: styles.position,
            zIndex: styles.zIndex,
            backgroundColor: styles.backgroundColor,
            display: styles.display,
            opacity: styles.opacity,
            transform: styles.transform
          },
          coverage: {
            gapFromTop: gapBetweenNavAndMenu,
            expectedTop: navHeight,
            matchesExpectedTop: Math.abs(gapBetweenNavAndMenu - navHeight) < 5,
            coversViewport: rect.height >= (window.innerHeight - navHeight),
            menuCoversContent: menuCoversContent
          },
          visibleContentBehind: visibleBehindMenu.length > 0,
          visibleElements: visibleBehindMenu.slice(0, 5), // First 5 visible elements
          viewportHeight: window.innerHeight,
          navHeight: navHeight
        };
      }, NAV_BAR_HEIGHT);

      console.log('\n📊 Overlay Analysis:');
      if (overlayAnalysis.error) {
        console.log(`   ✗ ${overlayAnalysis.error}`);
      } else {
        console.log(`   Position: ${overlayAnalysis.styles.position}`);
        console.log(`   Z-Index: ${overlayAnalysis.styles.zIndex}`);
        console.log(`   Background: ${overlayAnalysis.styles.backgroundColor}`);
        console.log(`   Top Position: ${overlayAnalysis.position.top}px`);
        console.log(`   Expected Top: ${overlayAnalysis.coverage.expectedTop}px`);
        console.log(`   Gap from Nav: ${overlayAnalysis.coverage.gapFromTop}px`);
        console.log(`   Menu Height: ${overlayAnalysis.position.height}px`);
        console.log(`   Viewport Height: ${overlayAnalysis.viewportHeight}px`);
        console.log(`\n✓ Tests:`);
        console.log(`   ${overlayAnalysis.coverage.matchesExpectedTop ? '✓' : '✗'} Menu starts at nav bottom (${NAV_BAR_HEIGHT}px)`);
        console.log(`   ${overlayAnalysis.coverage.coversViewport ? '✓' : '✗'} Menu covers full viewport`);
        console.log(`   ${!overlayAnalysis.visibleContentBehind ? '✓' : '✗'} No content visible behind menu`);

        if (overlayAnalysis.visibleContentBehind) {
          console.log(`\n   ⚠️  ISSUE: Content visible behind menu!`);
          console.log(`   Visible elements (${overlayAnalysis.visibleElements.length}):`);
          overlayAnalysis.visibleElements.forEach((el, i) => {
            console.log(`     ${i + 1}. <${el.tag}> z-index:${el.zIndex} - "${el.text}"`);
          });
        }
      }

      pageResult.tests.push({
        test: 'Mobile Menu Overlay Coverage',
        passed: !overlayAnalysis.error &&
                overlayAnalysis.coverage.matchesExpectedTop &&
                overlayAnalysis.coverage.coversViewport &&
                !overlayAnalysis.visibleContentBehind,
        details: overlayAnalysis
      });

      // STEP 5: Check menu items
      const menuItems = await page.evaluate(() => {
        const mobileMenu = document.querySelector('[class*="mobile"]') ||
                          document.getElementById('mobile-menu') ||
                          document.querySelector('nav + div') ||
                          document.querySelector('[role="dialog"]');

        if (!mobileMenu) return [];

        const links = mobileMenu.querySelectorAll('a');
        return Array.from(links).map(link => ({
          text: link.textContent.trim(),
          href: link.getAttribute('href'),
          visible: window.getComputedStyle(link).display !== 'none'
        }));
      });

      console.log(`\n📋 Menu Items (${menuItems.length}):`);
      menuItems.forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.text} → ${item.href} ${item.visible ? '✓' : '✗ hidden'}`);
      });

      pageResult.tests.push({
        test: 'Menu Items Present',
        passed: menuItems.length > 0,
        details: { itemCount: menuItems.length, items: menuItems }
      });

      // STEP 6: Close menu and verify
      console.log('\n🖱️  Closing Mobile Menu...');
      await page.evaluate(() => {
        const closeButton = document.querySelector('[aria-label="Close menu"]') ||
                           document.querySelector('[aria-label="Toggle menu"]') ||
                           document.querySelector('button[class*="hamburger"]') ||
                           document.querySelector('button svg path[d*="M6 18L18 6"]')?.closest('button');
        if (closeButton) {
          closeButton.click();
        }
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      const closedState = await page.evaluate(() => {
        const mobileMenu = document.querySelector('[class*="mobile"]') ||
                          document.getElementById('mobile-menu') ||
                          document.querySelector('nav + div') ||
                          document.querySelector('[role="dialog"]');

        return {
          menuVisible: mobileMenu ? window.getComputedStyle(mobileMenu).display !== 'none' : false
        };
      });

      console.log(`\n   Menu closed: ${!closedState.menuVisible ? '✓' : '✗'}`);

      pageResult.tests.push({
        test: 'Menu Closes Properly',
        passed: !closedState.menuVisible,
        details: closedState
      });

    } catch (error) {
      console.log(`\n✗ Error testing ${testPage.name}: ${error.message}`);
      pageResult.tests.push({
        test: 'Page Test',
        passed: false,
        error: error.message
      });
    }

    results.tests.push(pageResult);
  }

  // Generate summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(70));

  let totalTests = 0;
  let passedTests = 0;

  results.tests.forEach(pageResult => {
    console.log(`\n${pageResult.page.toUpperCase()} PAGE:`);
    pageResult.tests.forEach(test => {
      totalTests++;
      if (test.passed) passedTests++;
      console.log(`  ${test.passed ? '✓' : '✗'} ${test.test}`);
      if (!test.passed && test.reason) {
        console.log(`    Reason: ${test.reason}`);
      }
    });
  });

  console.log(`\n${'='.repeat(70)}`);
  console.log(`RESULT: ${passedTests}/${totalTests} tests passed`);
  console.log(`Screenshots saved to: ${screenshotDir}`);
  console.log(`${'='.repeat(70)}\n`);

  // Save detailed results to JSON
  fs.writeFileSync(
    path.join(screenshotDir, 'test-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('📄 Detailed results saved to: test-results.json\n');

  await browser.close();
  return results;
}

// Run the test
testMobileNavigation().catch(console.error);
