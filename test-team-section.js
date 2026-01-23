const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  // Set desktop viewport first
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('\n=== STARTING TEAM SECTION TEST ===\n');

  try {
    // Navigate to About page
    console.log('1. Navigating to About page...');
    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✓ Page loaded successfully\n');

    // Wait for team section to be visible
    console.log('2. Waiting for team section to load...');
    await page.waitForSelector('text/MEET THE TEAM', { timeout: 10000 });
    console.log('✓ Team section found\n');

    // Scroll to team section
    console.log('3. Scrolling to team section...');
    await page.evaluate(() => {
      const element = document.querySelector('h2');
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const teamHeading = headings.find(h => h.textContent.includes('MEET THE TEAM'));
      if (teamHeading) {
        teamHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check section order
    console.log('4. Verifying section order...');
    const sectionOrder = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const sections = headings.map(h => h.textContent.trim());
      const whatWeDoIndex = sections.findIndex(s => s.includes('WHAT WE DO'));
      const meetTheTeamIndex = sections.findIndex(s => s.includes('MEET THE TEAM'));

      return {
        sections: sections,
        whatWeDoIndex,
        meetTheTeamIndex,
        orderCorrect: whatWeDoIndex < meetTheTeamIndex && meetTheTeamIndex >= 0
      };
    });

    console.log('   Sections found:', sectionOrder.sections);
    console.log('   "WHAT WE DO" at index:', sectionOrder.whatWeDoIndex);
    console.log('   "MEET THE TEAM" at index:', sectionOrder.meetTheTeamIndex);
    console.log('   Order correct:', sectionOrder.orderCorrect ? '✓' : '✗');
    console.log('');

    // Take full desktop screenshot of team section
    console.log('5. Capturing desktop screenshot of team section...');
    const teamSection = await page.$('h2, h3');
    if (teamSection) {
      const teamHeadings = await page.$$('h2, h3');
      let teamElement = null;
      for (const heading of teamHeadings) {
        const text = await heading.evaluate(el => el.textContent);
        if (text.includes('MEET THE TEAM')) {
          teamElement = heading;
          break;
        }
      }

      if (teamElement) {
        const box = await teamElement.boundingBox();
        await page.screenshot({
          path: 'team-section-desktop-full.png',
          clip: {
            x: 0,
            y: Math.max(0, box.y - 100),
            width: 1920,
            height: 1000
          }
        });
        console.log('✓ Desktop screenshot saved: team-section-desktop-full.png\n');
      }
    }

    // Analyze team member images
    console.log('6. Analyzing team member images...');
    const imageData = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]'));

      return images.map(img => {
        const rect = img.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(img);

        // Check if image is colored (not grayscale)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        return {
          alt: img.alt,
          src: img.src,
          width: rect.width,
          height: rect.height,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          aspectRatio: (rect.width / rect.height).toFixed(2),
          filter: computedStyle.filter,
          grayscale: computedStyle.filter.includes('grayscale'),
          objectFit: computedStyle.objectFit,
          objectPosition: computedStyle.objectPosition,
          clipPath: computedStyle.clipPath,
          visible: rect.width > 0 && rect.height > 0
        };
      });
    });

    console.log('   Found', imageData.length, 'team member images:');
    imageData.forEach((img, idx) => {
      console.log(`\n   Image ${idx + 1}:`);
      console.log(`     Alt text: ${img.alt}`);
      console.log(`     Dimensions: ${img.width}x${img.height}px`);
      console.log(`     Natural: ${img.naturalWidth}x${img.naturalHeight}px`);
      console.log(`     Aspect Ratio: ${img.aspectRatio}`);
      console.log(`     Filter: ${img.filter || 'none'}`);
      console.log(`     Grayscale: ${img.grayscale ? '✗ YES (should be color)' : '✓ NO (good)'}`);
      console.log(`     Object Fit: ${img.objectFit}`);
      console.log(`     Object Position: ${img.objectPosition}`);
      console.log(`     Visible: ${img.visible ? '✓' : '✗'}`);
    });
    console.log('');

    // Check for consistent sizing
    console.log('7. Checking image consistency...');
    const widths = imageData.map(img => img.width);
    const heights = imageData.map(img => img.height);
    const aspectRatios = imageData.map(img => parseFloat(img.aspectRatio));

    const allWidthsSame = widths.every(w => Math.abs(w - widths[0]) < 2);
    const allHeightsSame = heights.every(h => Math.abs(h - heights[0]) < 2);
    const allAspectRatiosSame = aspectRatios.every(ar => Math.abs(ar - aspectRatios[0]) < 0.05);
    const allSquare = aspectRatios.every(ar => Math.abs(ar - 1.0) < 0.1);

    console.log(`   All widths consistent: ${allWidthsSame ? '✓' : '✗'} (${widths.join(', ')})`);
    console.log(`   All heights consistent: ${allHeightsSame ? '✓' : '✗'} (${heights.join(', ')})`);
    console.log(`   All aspect ratios consistent: ${allAspectRatiosSame ? '✓' : '✗'} (${aspectRatios.join(', ')})`);
    console.log(`   All images square (1:1): ${allSquare ? '✓' : '✗'}`);
    console.log('');

    // Verify names and titles
    console.log('8. Verifying team member names and titles...');
    const teamMembers = await page.evaluate(() => {
      const members = [];
      const cards = Array.from(document.querySelectorAll('div')).filter(div => {
        const text = div.textContent;
        return text.includes('Smith') || text.includes('Carmenatty') || text.includes('Walker');
      });

      cards.forEach(card => {
        const text = card.textContent;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);

        if (lines.length >= 2) {
          members.push({
            name: lines[0],
            title: lines[1]
          });
        }
      });

      return members.filter((m, idx, self) =>
        idx === self.findIndex(t => t.name === m.name)
      );
    });

    const expectedMembers = [
      { name: 'Will Smith', title: 'Founder & CEO' },
      { name: 'Dr. Edgar Carmenatty', title: 'Principal Cyber Security Consultant' },
      { name: 'Charles Walker', title: 'Director, Mission Capture' }
    ];

    console.log('   Found team members:');
    teamMembers.forEach(member => {
      const expected = expectedMembers.find(e =>
        e.name.toLowerCase().includes(member.name.toLowerCase()) ||
        member.name.toLowerCase().includes(e.name.toLowerCase())
      );

      const nameMatch = expected ? '✓' : '✗';
      const titleMatch = expected && member.title.toLowerCase().includes(expected.title.toLowerCase()) ? '✓' : '✗';

      console.log(`     ${nameMatch} ${member.name}`);
      console.log(`     ${titleMatch}   ${member.title}`);
    });
    console.log('');

    // Take close-up screenshots of each team member
    console.log('9. Taking individual team member screenshots...');
    await page.screenshot({
      path: 'team-section-all-members-desktop.png',
      fullPage: false
    });
    console.log('✓ All members screenshot saved\n');

    // Test mobile view
    console.log('10. Testing mobile view (iPhone 14 Pro)...');
    await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 3 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Scroll to team section on mobile
    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const teamHeading = headings.find(h => h.textContent.includes('MEET THE TEAM'));
      if (teamHeading) {
        teamHeading.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Capture mobile screenshot
    await page.screenshot({
      path: 'team-section-mobile-iphone14pro.png',
      fullPage: false
    });
    console.log('✓ Mobile screenshot saved: team-section-mobile-iphone14pro.png\n');

    // Check mobile image sizing
    const mobileImageData = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]'));

      return images.map(img => {
        const rect = img.getBoundingClientRect();
        return {
          alt: img.alt,
          width: rect.width,
          height: rect.height,
          aspectRatio: (rect.width / rect.height).toFixed(2),
          visible: rect.width > 0 && rect.height > 0
        };
      });
    });

    console.log('11. Mobile image analysis:');
    mobileImageData.forEach((img, idx) => {
      console.log(`   Image ${idx + 1}: ${img.alt}`);
      console.log(`     Dimensions: ${img.width}x${img.height}px`);
      console.log(`     Aspect Ratio: ${img.aspectRatio}`);
      console.log(`     Visible: ${img.visible ? '✓' : '✗'}`);
    });
    console.log('');

    // Test hover effects (back to desktop)
    console.log('12. Testing hover effects on desktop...');
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const teamHeading = headings.find(h => h.textContent.includes('MEET THE TEAM'));
      if (teamHeading) {
        teamHeading.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find team member cards and hover over first one
    const teamCards = await page.$$('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]');

    if (teamCards.length > 0) {
      console.log(`   Found ${teamCards.length} team member cards`);
      console.log('   Hovering over first team member...');

      await teamCards[0].hover();
      await new Promise(resolve => setTimeout(resolve, 1000));

      await page.screenshot({
        path: 'team-member-hover-effect.png',
        fullPage: false
      });
      console.log('✓ Hover effect screenshot saved\n');
    }

    // Summary
    console.log('\n=== TEST SUMMARY ===\n');
    console.log('Screenshots captured:');
    console.log('  ✓ team-section-desktop-full.png');
    console.log('  ✓ team-section-all-members-desktop.png');
    console.log('  ✓ team-section-mobile-iphone14pro.png');
    console.log('  ✓ team-member-hover-effect.png');
    console.log('');
    console.log('Checks performed:');
    console.log(`  ${sectionOrder.orderCorrect ? '✓' : '✗'} Section appears after "WHAT WE DO"`);
    console.log(`  ${imageData.length === 3 ? '✓' : '✗'} All 3 team members found (found ${imageData.length})`);
    console.log(`  ${imageData.every(img => !img.grayscale) ? '✓' : '✗'} All images in color (not grayscale)`);
    console.log(`  ${allWidthsSame && allHeightsSame ? '✓' : '✗'} Consistent image sizing`);
    console.log(`  ${allSquare ? '✓' : '✗'} Square aspect ratios (1:1)`);
    console.log(`  ${teamMembers.length >= 3 ? '✓' : '✗'} All names and titles present`);
    console.log('');

    console.log('✓ Test complete! Please review the screenshots.\n');

  } catch (error) {
    console.error('ERROR during test:', error.message);
    await page.screenshot({ path: 'team-section-error.png', fullPage: true });
    console.log('Error screenshot saved: team-section-error.png');
  }

  // Keep browser open for manual inspection
  console.log('Browser remains open for manual inspection. Close it when done.');

})();
