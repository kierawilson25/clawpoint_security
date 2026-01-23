/**
 * Mobile Responsiveness QA Test Suite
 * Target: iPhone SE viewport (375px width)
 * Tests all pages for mobile-specific issues
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const VIEWPORT = {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
};

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/contact', name: 'Contact' },
  { path: '/infinite-view', name: 'Infinite View' },
  { path: '/careers', name: 'Careers' }
];

const MIN_TOUCH_TARGET = 44; // 44x44px minimum for touch targets

const screenshotDir = path.join(__dirname, 'mobile-screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const reportPath = path.join(__dirname, 'MOBILE-RESPONSIVE-TEST-REPORT.md');

let browser;
let bugCount = 0;
let reportContent = `# Mobile Responsiveness Test Report
**Test Date**: ${new Date().toISOString()}
**Viewport**: ${VIEWPORT.width}x${VIEWPORT.height} (iPhone SE)
**Pages Tested**: ${PAGES.length}

---

## Executive Summary

`;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkHorizontalScroll(page) {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

async function checkOverflowingElements(page) {
  return await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const elements = Array.from(document.querySelectorAll('*'));
    const overflowing = [];

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth || rect.left < 0) {
        const styles = window.getComputedStyle(el);
        if (styles.display !== 'none' && styles.visibility !== 'hidden') {
          overflowing.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            width: rect.width,
            right: rect.right,
            left: rect.left
          });
        }
      }
    });

    return overflowing;
  });
}

async function checkTouchTargets(page) {
  return await page.evaluate((minSize) => {
    const interactive = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [onclick]');
    const smallTargets = [];

    interactive.forEach(el => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);

      if (styles.display !== 'none' && styles.visibility !== 'hidden') {
        if (rect.width < minSize || rect.height < minSize) {
          smallTargets.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            text: el.textContent.substring(0, 50),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    });

    return smallTargets;
  }, MIN_TOUCH_TARGET);
}

async function checkImages(page) {
  return await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const issues = [];

    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (!img.alt || img.alt.trim() === '') {
        issues.push({
          type: 'missing-alt',
          src: img.src,
          width: rect.width
        });
      }

      if (rect.width > viewportWidth) {
        issues.push({
          type: 'oversized',
          src: img.src,
          width: rect.width,
          viewportWidth: viewportWidth
        });
      }
    });

    return issues;
  });
}

async function checkNavigation(page) {
  return await page.evaluate(() => {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu"]');
    const mobileMenu = document.querySelector('[class*="mobile-menu"], [class*="nav-mobile"]');

    return {
      hasNav: !!nav,
      hasHamburger: !!hamburger,
      hasMobileMenu: !!mobileMenu,
      hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false
    };
  });
}

async function checkCTAButtons(page) {
  return await page.evaluate(() => {
    const ctaButtons = Array.from(document.querySelectorAll('a[href*="contact"], button[class*="cta"], a[class*="cta"], button[class*="schedule"], a[class*="schedule"]'));
    const issues = [];

    ctaButtons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const styles = window.getComputedStyle(btn);

      if (styles.display !== 'none' && styles.visibility !== 'hidden') {
        const isAccessible = rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth;

        issues.push({
          text: btn.textContent.trim().substring(0, 30),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          isAccessible: isAccessible,
          isVisible: rect.width > 0 && rect.height > 0
        });
      }
    });

    return issues;
  });
}

async function getConsoleErrors(page) {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

async function checkFooter(page) {
  return await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { exists: false };

    const rect = footer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const styles = window.getComputedStyle(footer);

    return {
      exists: true,
      width: rect.width,
      overflowing: rect.right > viewportWidth || rect.left < 0,
      display: styles.display
    };
  });
}

async function checkStatStrip(page) {
  return await page.evaluate(() => {
    const statSection = document.querySelector('[class*="stat"]') ||
                        document.querySelector('[class*="credential"]') ||
                        document.querySelector('[class*="achievement"]');

    if (!statSection) return { exists: false };

    const rect = statSection.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    return {
      exists: true,
      width: rect.width,
      overflowing: rect.right > viewportWidth,
      visible: rect.width > 0 && rect.height > 0
    };
  });
}

async function testPage(page, pageInfo) {
  const url = `${BASE_URL}${pageInfo.path}`;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${pageInfo.name}`);
  console.log(`URL: ${url}`);
  console.log(`${'='.repeat(60)}`);

  let pageReport = `\n## ${pageInfo.name} (${pageInfo.path})\n\n`;
  pageReport += `**Screenshot**: mobile-screenshots/${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-mobile.png\n\n`;

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(2000); // Allow animations to settle

    // Take screenshot
    const screenshotPath = path.join(screenshotDir, `${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-mobile.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Screenshot saved: ${screenshotPath}`);

    let issueCount = 0;

    // 1. Check for horizontal scrolling
    console.log('\n1. Checking for horizontal scrolling...');
    const hasHorizontalScroll = await checkHorizontalScroll(page);
    if (hasHorizontalScroll) {
      console.log('  ✗ ISSUE: Horizontal scrolling detected');
      pageReport += `### 🔴 CRITICAL: Horizontal Scrolling\n`;
      pageReport += `- Page width exceeds viewport (375px)\n`;
      pageReport += `- User will need to scroll horizontally to view content\n\n`;
      issueCount++;
      bugCount++;
    } else {
      console.log('  ✓ No horizontal scrolling');
      pageReport += `### ✓ No Horizontal Scrolling\n\n`;
    }

    // 2. Check for overflowing elements
    console.log('\n2. Checking for overflowing elements...');
    const overflowingElements = await checkOverflowingElements(page);
    if (overflowingElements.length > 0) {
      console.log(`  ✗ ISSUE: ${overflowingElements.length} elements overflow viewport`);
      pageReport += `### 🟠 HIGH: Overflowing Elements (${overflowingElements.length})\n\n`;
      overflowingElements.slice(0, 5).forEach(el => {
        pageReport += `- **${el.tag}** ${el.class ? `class="${el.class}"` : ''} - Width: ${Math.round(el.width)}px (extends to ${Math.round(el.right)}px)\n`;
      });
      if (overflowingElements.length > 5) {
        pageReport += `- ...and ${overflowingElements.length - 5} more\n`;
      }
      pageReport += `\n`;
      issueCount++;
      bugCount++;
    } else {
      console.log('  ✓ No overflowing elements');
      pageReport += `### ✓ No Overflowing Elements\n\n`;
    }

    // 3. Check touch targets
    console.log('\n3. Checking touch target sizes...');
    const smallTargets = await checkTouchTargets(page);
    if (smallTargets.length > 0) {
      console.log(`  ✗ ISSUE: ${smallTargets.length} touch targets below 44x44px`);
      pageReport += `### 🟡 MEDIUM: Small Touch Targets (${smallTargets.length})\n\n`;
      pageReport += `Minimum recommended size: 44x44px\n\n`;
      smallTargets.slice(0, 8).forEach(target => {
        pageReport += `- **${target.tag}** ${target.class ? `"${target.class}"` : ''} - ${target.width}x${target.height}px\n`;
        if (target.text) pageReport += `  Text: "${target.text.substring(0, 40)}..."\n`;
      });
      if (smallTargets.length > 8) {
        pageReport += `- ...and ${smallTargets.length - 8} more\n`;
      }
      pageReport += `\n`;
      issueCount++;
      bugCount++;
    } else {
      console.log('  ✓ All touch targets meet minimum size');
      pageReport += `### ✓ Touch Targets Meet Minimum Size\n\n`;
    }

    // 4. Check images
    console.log('\n4. Checking images...');
    const imageIssues = await checkImages(page);
    if (imageIssues.length > 0) {
      const missingAlt = imageIssues.filter(i => i.type === 'missing-alt');
      const oversized = imageIssues.filter(i => i.type === 'oversized');

      if (missingAlt.length > 0) {
        console.log(`  ✗ ISSUE: ${missingAlt.length} images missing alt text`);
        pageReport += `### 🟡 MEDIUM: Missing Alt Text (${missingAlt.length} images)\n\n`;
        issueCount++;
        bugCount++;
      }

      if (oversized.length > 0) {
        console.log(`  ✗ ISSUE: ${oversized.length} images exceed viewport width`);
        pageReport += `### 🟠 HIGH: Oversized Images (${oversized.length})\n\n`;
        oversized.slice(0, 3).forEach(img => {
          pageReport += `- Width: ${Math.round(img.width)}px (viewport: ${img.viewportWidth}px)\n`;
        });
        pageReport += `\n`;
        issueCount++;
        bugCount++;
      }
    } else {
      console.log('  ✓ All images properly sized with alt text');
      pageReport += `### ✓ Images Properly Configured\n\n`;
    }

    // 5. Check navigation
    console.log('\n5. Checking navigation...');
    const navInfo = await checkNavigation(page);
    pageReport += `### Navigation Status\n\n`;
    pageReport += `- Has navigation: ${navInfo.hasNav ? '✓' : '✗'}\n`;
    pageReport += `- Has hamburger menu: ${navInfo.hasHamburger ? '✓' : '✗'}\n`;
    pageReport += `- Hamburger visible at 375px: ${navInfo.hamburgerVisible ? '✓' : '✗'}\n`;
    pageReport += `- Has mobile menu component: ${navInfo.hasMobileMenu ? '✓' : '✗'}\n\n`;

    if (navInfo.hasNav && !navInfo.hasHamburger) {
      console.log('  ✗ WARNING: Desktop navigation found, no hamburger menu');
      pageReport += `**⚠️ Warning**: Desktop navigation visible at mobile size - should use hamburger menu\n\n`;
      issueCount++;
      bugCount++;
    }

    // 6. Check CTA buttons
    console.log('\n6. Checking CTA buttons...');
    const ctaInfo = await checkCTAButtons(page);
    if (ctaInfo.length > 0) {
      pageReport += `### CTA Buttons (${ctaInfo.length} found)\n\n`;
      ctaInfo.forEach(cta => {
        const status = cta.isAccessible && cta.isVisible ? '✓' : '✗';
        pageReport += `- ${status} "${cta.text}" - ${cta.width}x${cta.height}px - ${cta.isAccessible ? 'Accessible' : 'Not fully accessible'}\n`;
      });
      pageReport += `\n`;

      const inaccessible = ctaInfo.filter(c => !c.isAccessible || !c.isVisible);
      if (inaccessible.length > 0) {
        console.log(`  ✗ WARNING: ${inaccessible.length} CTA buttons not fully accessible`);
        issueCount++;
        bugCount++;
      }
    } else {
      pageReport += `### ⚠️ No CTA Buttons Found\n\n`;
      console.log('  ⚠️ No CTA buttons found');
    }

    // 7. Check footer
    console.log('\n7. Checking footer...');
    const footerInfo = await checkFooter(page);
    if (footerInfo.exists) {
      if (footerInfo.overflowing) {
        console.log('  ✗ ISSUE: Footer overflows viewport');
        pageReport += `### 🟠 HIGH: Footer Layout Issue\n`;
        pageReport += `- Footer width exceeds viewport\n\n`;
        issueCount++;
        bugCount++;
      } else {
        console.log('  ✓ Footer layout correct');
        pageReport += `### ✓ Footer Layout Correct\n\n`;
      }
    } else {
      pageReport += `### ⚠️ No Footer Found\n\n`;
    }

    // 8. Check stat strip
    console.log('\n8. Checking stat strip / credentials section...');
    const statInfo = await checkStatStrip(page);
    if (statInfo.exists) {
      if (statInfo.overflowing) {
        console.log('  ✗ ISSUE: Stat strip overflows viewport');
        pageReport += `### 🟠 HIGH: Stat Strip Overflow\n`;
        pageReport += `- Stats section width exceeds viewport\n\n`;
        issueCount++;
        bugCount++;
      } else {
        console.log('  ✓ Stat strip displays properly');
        pageReport += `### ✓ Stat Strip Displays Properly\n\n`;
      }
    } else {
      pageReport += `### Stat Strip Not Found (may not be on this page)\n\n`;
    }

    // Summary for this page
    if (issueCount === 0) {
      pageReport += `\n**✓ Page Status**: PASS - No mobile responsiveness issues detected\n\n`;
      console.log('\n✓ PAGE PASS: No issues detected');
    } else {
      pageReport += `\n**✗ Page Status**: FAIL - ${issueCount} issue(s) detected\n\n`;
      console.log(`\n✗ PAGE FAIL: ${issueCount} issues detected`);
    }

    pageReport += `---\n`;

  } catch (error) {
    console.error(`✗ ERROR testing ${pageInfo.name}:`, error.message);
    pageReport += `\n### 🔴 CRITICAL: Test Error\n\n`;
    pageReport += `Failed to load or test page: ${error.message}\n\n`;
    pageReport += `---\n`;
    bugCount++;
  }

  return pageReport;
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     MOBILE RESPONSIVENESS QA TEST SUITE                   ║');
  console.log('║     Target: iPhone SE (375x667px)                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // Test each page
    for (const pageInfo of PAGES) {
      const pageReport = await testPage(page, pageInfo);
      reportContent += pageReport;
    }

    // Add executive summary
    const summaryInsert = `
**Total Bugs Found**: ${bugCount}
**Test Status**: ${bugCount === 0 ? '✓ ALL PAGES PASS' : '✗ ISSUES DETECTED'}

${bugCount === 0 ?
  '✓ All pages are fully responsive at 375px viewport with no critical issues.' :
  `⚠️ ${bugCount} mobile responsiveness issue(s) detected across tested pages. See details below.`}

---
`;

    reportContent = reportContent.replace('---\n\n## Executive Summary\n\n', summaryInsert);

    // Write report
    fs.writeFileSync(reportPath, reportContent);

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    TEST COMPLETE                           ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`Total bugs found: ${bugCount}`);
    console.log(`Report saved to: ${reportPath}`);
    console.log(`Screenshots saved to: ${screenshotDir}/\n`);

  } catch (error) {
    console.error('Test suite error:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runTests();
