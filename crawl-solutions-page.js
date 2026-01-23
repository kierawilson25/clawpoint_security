const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to Solutions page...');
  await page.goto('https://www.clawpointsecuritycollective.com/solutions', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait a bit more for any lazy-loaded content
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Extracting content...');

  const pageContent = await page.evaluate(() => {
    const content = {
      title: document.title,
      url: window.location.href,
      navigation: [],
      hero: {},
      sections: [],
      footer: {},
      allText: [],
      ctaButtons: [],
      headings: {
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: []
      }
    };

    // Extract all headings with hierarchy
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      const headings = Array.from(document.querySelectorAll(tag));
      content.headings[tag] = headings.map(h => ({
        text: h.innerText.trim(),
        level: tag
      })).filter(h => h.text.length > 0);
    });

    // Extract navigation
    const navElements = document.querySelectorAll('nav a, header a, [role="navigation"] a');
    content.navigation = Array.from(navElements).map(link => ({
      text: link.innerText.trim(),
      href: link.getAttribute('href')
    })).filter(item => item.text.length > 0);

    // Extract all buttons and CTAs
    const buttons = document.querySelectorAll('button, a[class*="button"], a[class*="btn"], a[class*="cta"]');
    content.ctaButtons = Array.from(buttons).map(btn => ({
      text: btn.innerText.trim(),
      type: btn.tagName,
      classes: btn.className,
      href: btn.getAttribute('href')
    })).filter(btn => btn.text.length > 0);

    // Extract all paragraphs
    const paragraphs = document.querySelectorAll('p');
    const paragraphTexts = Array.from(paragraphs)
      .map(p => p.innerText.trim())
      .filter(text => text.length > 0);

    // Extract all list items
    const listItems = document.querySelectorAll('li');
    const listTexts = Array.from(listItems)
      .map(li => li.innerText.trim())
      .filter(text => text.length > 0);

    // Extract all visible text
    const allTextNodes = document.querySelectorAll('body *');
    const visibleText = Array.from(allTextNodes)
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' &&
               style.visibility !== 'hidden' &&
               style.opacity !== '0';
      })
      .map(el => {
        // Get only direct text, not children
        const clone = el.cloneNode(true);
        const children = clone.querySelectorAll('*');
        children.forEach(child => child.remove());
        return clone.textContent.trim();
      })
      .filter(text => text.length > 0 && text.length < 500); // Reasonable text length

    content.allText = [...new Set(visibleText)]; // Remove duplicates
    content.paragraphs = paragraphTexts;
    content.listItems = listTexts;

    // Try to identify hero section (usually first major section)
    const heroSection = document.querySelector('section:first-of-type, [class*="hero"], [class*="banner"]');
    if (heroSection) {
      content.hero = {
        text: heroSection.innerText.trim(),
        hasImage: !!heroSection.querySelector('img'),
        imageAlt: heroSection.querySelector('img')?.getAttribute('alt') || ''
      };
    }

    // Extract footer
    const footer = document.querySelector('footer');
    if (footer) {
      const footerLinks = Array.from(footer.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      }));
      content.footer = {
        text: footer.innerText.trim(),
        links: footerLinks
      };
    }

    // Extract all sections
    const sections = document.querySelectorAll('section, [role="region"]');
    content.sections = Array.from(sections).map((section, index) => ({
      index: index,
      text: section.innerText.trim(),
      headings: Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => h.innerText.trim()),
      hasImages: !!section.querySelector('img'),
      imageCount: section.querySelectorAll('img').length
    })).filter(s => s.text.length > 0);

    return content;
  });

  // Take a full-page screenshot
  console.log('Taking screenshot...');
  await page.screenshot({
    path: '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/solutions-page-screenshot.png',
    fullPage: true
  });

  // Save the extracted content
  const outputPath = '/Users/kieralynnwilson/Documents/Coding Projects/2026/clawpoint_security/solutions-page-content.json';
  fs.writeFileSync(outputPath, JSON.stringify(pageContent, null, 2));

  console.log('\n=== EXTRACTION COMPLETE ===\n');
  console.log('Screenshot saved to: solutions-page-screenshot.png');
  console.log('Content saved to: solutions-page-content.json');
  console.log('\n=== PAGE TITLE ===');
  console.log(pageContent.title);
  console.log('\n=== ALL HEADINGS ===');
  Object.entries(pageContent.headings).forEach(([level, headings]) => {
    if (headings.length > 0) {
      console.log(`\n${level.toUpperCase()}:`);
      headings.forEach(h => console.log(`  - ${h.text}`));
    }
  });

  console.log('\n=== CTA BUTTONS ===');
  pageContent.ctaButtons.forEach(btn => {
    console.log(`  - "${btn.text}" (${btn.type}${btn.href ? ' -> ' + btn.href : ''})`);
  });

  console.log('\n=== NAVIGATION ITEMS ===');
  pageContent.navigation.forEach(nav => {
    console.log(`  - ${nav.text} -> ${nav.href}`);
  });

  await browser.close();
  console.log('\nBrowser closed.');
})();
