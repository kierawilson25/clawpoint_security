const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });

  try {
    const page = await browser.newPage();

    console.log('Navigating to Solutions page...');
    await page.goto('http://localhost:3000/solutions', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n=== SOLUTIONS PAGE LAYOUT ANALYSIS ===\n');

    // Check if the page loaded
    const title = await page.title();
    console.log(`Page Title: ${title}`);

    // Find the service cards grid/container
    const gridInfo = await page.evaluate(() => {
      // Look for the main services container
      const possibleContainers = [
        document.querySelector('[class*="grid"]'),
        document.querySelector('.grid'),
        document.querySelector('[class*="flex"]')
      ].filter(Boolean);

      if (possibleContainers.length === 0) {
        return { error: 'No grid or flex container found' };
      }

      const container = possibleContainers[0];
      const computedStyle = window.getComputedStyle(container);
      const classList = Array.from(container.classList);

      // Find service cards (looking for the three main services)
      const cards = container.children;

      return {
        containerClasses: classList,
        display: computedStyle.display,
        gridTemplateColumns: computedStyle.gridTemplateColumns,
        flexDirection: computedStyle.flexDirection,
        gap: computedStyle.gap,
        numberOfCards: cards.length,
        cardWidths: Array.from(cards).slice(0, 5).map((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardClasses = Array.from(card.classList);
          return {
            index: i,
            width: rect.width,
            classes: cardClasses,
            textContent: card.textContent.substring(0, 50)
          };
        })
      };
    });

    console.log('Container Information:');
    console.log('  Classes:', gridInfo.containerClasses);
    console.log('  Display:', gridInfo.display);
    console.log('  Grid Template Columns:', gridInfo.gridTemplateColumns);
    console.log('  Flex Direction:', gridInfo.flexDirection);
    console.log('  Gap:', gridInfo.gap);
    console.log('  Number of Cards:', gridInfo.numberOfCards);

    console.log('\nCard Layout Details:');
    gridInfo.cardWidths.forEach(card => {
      console.log(`  Card ${card.index}:`);
      console.log(`    Width: ${card.width}px`);
      console.log(`    Classes: ${card.classes.join(', ')}`);
      console.log(`    Preview: ${card.textContent.trim().substring(0, 40)}...`);
    });

    // Check for specific service titles
    const serviceInfo = await page.evaluate(() => {
      const services = [
        'MISSION-CENTRIC ASSURANCE',
        'CYBER OPERATIONS DESIGN',
        'SECURITY ARCHITECTURE'
      ];

      return services.map(serviceName => {
        const element = Array.from(document.querySelectorAll('h2, h3, h4, [class*="title"]'))
          .find(el => el.textContent.includes(serviceName));

        if (element) {
          const rect = element.getBoundingClientRect();
          const parent = element.closest('[class*="card"], .card, [class*="service"]');
          const parentRect = parent ? parent.getBoundingClientRect() : null;

          return {
            found: true,
            title: serviceName,
            position: { x: rect.x, y: rect.y },
            parentWidth: parentRect ? parentRect.width : 'N/A',
            parentLeft: parentRect ? parentRect.left : 'N/A'
          };
        }

        return { found: false, title: serviceName };
      });
    });

    console.log('\nService Cards Found:');
    serviceInfo.forEach(service => {
      if (service.found) {
        console.log(`  ✓ ${service.title}`);
        console.log(`    Position: x=${service.position.x}, y=${service.position.y}`);
        console.log(`    Parent Width: ${service.parentWidth}px`);
        console.log(`    Parent Left: ${service.parentLeft}px`);
      } else {
        console.log(`  ✗ ${service.title} - NOT FOUND`);
      }
    });

    // Determine layout type
    const layoutAnalysis = await page.evaluate(() => {
      const container = document.querySelector('[class*="grid"]') ||
                       document.querySelector('.grid') ||
                       document.querySelector('[class*="flex"]');

      if (!container) return { type: 'UNKNOWN', reason: 'No container found' };

      const cards = Array.from(container.children)
        .filter(card => card.offsetHeight > 50); // Filter out empty divs

      if (cards.length < 2) return { type: 'INSUFFICIENT_CARDS', count: cards.length };

      const firstCardRect = cards[0].getBoundingClientRect();
      const secondCardRect = cards[1].getBoundingClientRect();

      // Check if cards are side-by-side (horizontal)
      const isSideBySide = Math.abs(firstCardRect.top - secondCardRect.top) < 50;

      // Check if cards are stacked (vertical)
      const isStacked = secondCardRect.top > (firstCardRect.bottom - 50);

      return {
        type: isSideBySide ? 'HORIZONTAL' : isStacked ? 'VERTICAL' : 'UNKNOWN',
        firstCardTop: firstCardRect.top,
        firstCardBottom: firstCardRect.bottom,
        secondCardTop: secondCardRect.top,
        difference: secondCardRect.top - firstCardRect.bottom,
        isSideBySide,
        isStacked
      };
    });

    console.log('\n=== LAYOUT DETERMINATION ===');
    console.log(`Layout Type: ${layoutAnalysis.type}`);
    console.log(`Cards are side-by-side: ${layoutAnalysis.isSideBySide}`);
    console.log(`Cards are stacked vertically: ${layoutAnalysis.isStacked}`);
    console.log(`Vertical spacing between cards: ${layoutAnalysis.difference}px`);

    // Take screenshot of full page
    console.log('\nTaking screenshot...');
    await page.screenshot({
      path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/solutions-layout-check.png',
      fullPage: true
    });
    console.log('Screenshot saved: solutions-layout-check.png');

    // Take screenshot of just the services section
    const servicesSection = await page.$('[class*="grid"]');
    if (servicesSection) {
      await servicesSection.screenshot({
        path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/solutions-services-only.png'
      });
      console.log('Services section screenshot saved: solutions-services-only.png');
    }

    // Read the actual source code to check classes
    console.log('\n=== CHECKING SOURCE CODE ===');
    const sourceCheck = await page.evaluate(() => {
      const container = document.querySelector('[class*="grid"]');
      if (!container) return { error: 'No grid container found' };

      return {
        innerHTML: container.outerHTML.substring(0, 500),
        fullClassName: container.className
      };
    });

    console.log('Grid Container Classes:', sourceCheck.fullClassName);

    console.log('\n=== SUMMARY ===');
    if (layoutAnalysis.type === 'HORIZONTAL') {
      console.log('⚠️  ISSUE FOUND: Cards are displayed SIDE-BY-SIDE (horizontal layout)');
      console.log('    Expected: Vertically stacked cards');
      console.log('    Action needed: Change grid-cols-3 to grid-cols-1');
    } else if (layoutAnalysis.type === 'VERTICAL') {
      console.log('✓ CORRECT: Cards are stacked VERTICALLY as expected');
    } else {
      console.log('? UNCLEAR: Unable to determine layout type clearly');
    }

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
})();
