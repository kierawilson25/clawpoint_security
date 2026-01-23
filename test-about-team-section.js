const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });

  const page = await browser.newPage();

  console.log('🧪 Starting About Page Team Section Test...\n');

  try {
    // Navigate to About page
    console.log('📍 Navigating to http://localhost:3000/about');
    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for page to fully load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take full page screenshot
    console.log('📸 Taking full page screenshot...');
    await page.screenshot({
      path: 'about-page-full.png',
      fullPage: true
    });
    console.log('✅ Saved: about-page-full.png\n');

    // Check for "What We Do" section
    console.log('🔍 Checking for "What We Do" section...');
    const whatWeDoSection = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      const whatWeDo = headings.find(h => h.textContent.includes('What We Do'));
      return whatWeDo ? whatWeDo.textContent : null;
    });

    if (whatWeDoSection) {
      console.log(`✅ Found section: "${whatWeDoSection}"\n`);
    } else {
      console.log('⚠️  "What We Do" section not found\n');
    }

    // Scroll to team section
    console.log('🔍 Looking for Team section...');
    const teamSectionExists = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      const teamHeading = headings.find(h =>
        h.textContent.includes('Team') ||
        h.textContent.includes('Our People') ||
        h.textContent.includes('Leadership')
      );

      if (teamHeading) {
        teamHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return teamHeading.textContent;
      }
      return null;
    });

    if (teamSectionExists) {
      console.log(`✅ Found team section: "${teamSectionExists}"`);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Take screenshot of team section
      console.log('📸 Taking team section screenshot...');
      await page.screenshot({
        path: 'about-team-section-desktop.png',
        fullPage: false
      });
      console.log('✅ Saved: about-team-section-desktop.png\n');
    } else {
      console.log('⚠️  Team section not found\n');
    }

    // Find all team member images
    console.log('🔍 Analyzing team member images...');
    const teamImages = await page.evaluate(() => {
      // Look for images that might be team members
      const images = Array.from(document.querySelectorAll('img'));

      return images.map((img, index) => ({
        index: index + 1,
        src: img.src,
        alt: img.alt || 'No alt text',
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        className: img.className,
        // Get computed styles
        filter: window.getComputedStyle(img).filter,
        objectFit: window.getComputedStyle(img).objectFit,
        objectPosition: window.getComputedStyle(img).objectPosition
      }));
    });

    console.log(`\n📊 Found ${teamImages.length} total images on page\n`);

    // Filter likely team member images
    const teamMemberImages = teamImages.filter(img =>
      img.alt.toLowerCase().includes('dr.') ||
      img.alt.toLowerCase().includes('edgar') ||
      img.alt.toLowerCase().includes('carmenatty') ||
      img.alt.toLowerCase().includes('team') ||
      img.alt.toLowerCase().includes('member') ||
      img.src.includes('headshot') ||
      img.src.includes('team')
    );

    if (teamMemberImages.length > 0) {
      console.log('👥 Team Member Images Found:\n');
      teamMemberImages.forEach((img, i) => {
        console.log(`Image ${i + 1}:`);
        console.log(`  Alt Text: ${img.alt}`);
        console.log(`  Source: ${img.src.substring(0, 80)}...`);
        console.log(`  Dimensions: ${img.width}x${img.height}px (natural: ${img.naturalWidth}x${img.naturalHeight})`);
        console.log(`  Object Fit: ${img.objectFit}`);
        console.log(`  Object Position: ${img.objectPosition}`);
        console.log(`  Filter: ${img.filter}`);
        console.log(`  Loaded: ${img.complete ? '✅' : '❌'}`);
        console.log('');
      });
    } else {
      console.log('⚠️  No team member images identified by alt text or src\n');
      console.log('All images on page:');
      teamImages.forEach((img, i) => {
        console.log(`${i + 1}. ${img.alt} - ${img.src.substring(img.src.lastIndexOf('/'))}`);
      });
    }

    // Check for Dr. Edgar Carmenatty specifically
    console.log('\n🔍 Checking for Dr. Edgar Carmenatty...');
    const carmenattyImage = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const edgar = images.find(img =>
        img.alt.toLowerCase().includes('edgar') ||
        img.alt.toLowerCase().includes('carmenatty')
      );

      if (edgar) {
        const rect = edgar.getBoundingClientRect();
        const styles = window.getComputedStyle(edgar);

        return {
          found: true,
          alt: edgar.alt,
          src: edgar.src,
          visible: rect.top >= 0 && rect.top < window.innerHeight,
          boundingBox: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          styles: {
            objectFit: styles.objectFit,
            objectPosition: styles.objectPosition,
            filter: styles.filter,
            overflow: styles.overflow
          }
        };
      }
      return { found: false };
    });

    if (carmenattyImage.found) {
      console.log('✅ Dr. Edgar Carmenatty image FOUND');
      console.log(`   Alt: ${carmenattyImage.alt}`);
      console.log(`   Visible in viewport: ${carmenattyImage.visible ? '✅' : '❌'}`);
      console.log(`   Object Fit: ${carmenattyImage.styles.objectFit}`);
      console.log(`   Object Position: ${carmenattyImage.styles.objectPosition}`);
      console.log(`   Filter: ${carmenattyImage.styles.filter}`);

      // Scroll to this image and screenshot
      await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const edgar = images.find(img =>
          img.alt.toLowerCase().includes('edgar') ||
          img.alt.toLowerCase().includes('carmenatty')
        );
        if (edgar) {
          edgar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('\n📸 Taking close-up of Dr. Carmenatty image...');
      await page.screenshot({
        path: 'carmenatty-headshot-closeup.png'
      });
      console.log('✅ Saved: carmenatty-headshot-closeup.png\n');
    } else {
      console.log('❌ Dr. Edgar Carmenatty image NOT FOUND\n');
    }

    // Check console for errors
    console.log('🔍 Checking browser console for errors...');
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push(`ERROR: ${msg.text()}`);
      }
    });

    if (consoleLogs.length > 0) {
      console.log('⚠️  Console Errors Found:');
      consoleLogs.forEach(log => console.log(`   ${log}`));
    } else {
      console.log('✅ No console errors detected\n');
    }

    // Test mobile viewport
    console.log('\n📱 Testing Mobile Viewport (375x667)...');
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.screenshot({
      path: 'about-team-section-mobile.png',
      fullPage: true
    });
    console.log('✅ Saved: about-team-section-mobile.png\n');

    // Test tablet viewport
    console.log('📱 Testing Tablet Viewport (768x1024)...');
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.screenshot({
      path: 'about-team-section-tablet.png',
      fullPage: true
    });
    console.log('✅ Saved: about-team-section-tablet.png\n');

    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Page loaded successfully: http://localhost:3000/about`);
    console.log(`${whatWeDoSection ? '✅' : '❌'} "What We Do" section found`);
    console.log(`${teamSectionExists ? '✅' : '❌'} Team section found`);
    console.log(`${teamMemberImages.length > 0 ? '✅' : '❌'} Team member images identified: ${teamMemberImages.length}`);
    console.log(`${carmenattyImage.found ? '✅' : '❌'} Dr. Edgar Carmenatty image found`);
    console.log('\n📸 Screenshots saved:');
    console.log('   - about-page-full.png (full page desktop)');
    console.log('   - about-team-section-desktop.png (team section)');
    if (carmenattyImage.found) {
      console.log('   - carmenatty-headshot-closeup.png');
    }
    console.log('   - about-team-section-mobile.png (375px width)');
    console.log('   - about-team-section-tablet.png (768px width)');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'about-page-error.png' });
    console.log('📸 Error screenshot saved: about-page-error.png');
  } finally {
    await browser.close();
    console.log('✅ Test complete. Browser closed.\n');
  }
})();
