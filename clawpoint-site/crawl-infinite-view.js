const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to Infinite View page...');
  await page.goto('https://www.clawpointsecuritycollective.com/infinite-view', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait a bit more for any lazy-loaded content
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('\n========================================');
  console.log('INFINITE VIEW PAGE CONTENT EXTRACTION');
  console.log('========================================\n');

  // Extract all text content with structure
  const content = await page.evaluate(() => {
    const result = {
      pageTitle: document.title,
      url: window.location.href,
      sections: []
    };

    // Helper function to clean text
    const cleanText = (text) => text.trim().replace(/\s+/g, ' ');

    // Get hero section
    const hero = document.querySelector('header, [class*="hero"], [class*="Hero"], section:first-of-type');
    if (hero) {
      const heroData = {
        type: 'Hero Section',
        headings: [],
        paragraphs: [],
        buttons: []
      };

      const h1s = hero.querySelectorAll('h1');
      h1s.forEach(h1 => {
        const text = cleanText(h1.innerText);
        if (text) heroData.headings.push({ level: 'H1', text });
      });

      const h2s = hero.querySelectorAll('h2');
      h2s.forEach(h2 => {
        const text = cleanText(h2.innerText);
        if (text) heroData.headings.push({ level: 'H2', text });
      });

      const paras = hero.querySelectorAll('p');
      paras.forEach(p => {
        const text = cleanText(p.innerText);
        if (text && text.length > 10) heroData.paragraphs.push(text);
      });

      const buttons = hero.querySelectorAll('a, button');
      buttons.forEach(btn => {
        const text = cleanText(btn.innerText);
        if (text && text.length > 0 && text.length < 100) {
          heroData.buttons.push(text);
        }
      });

      result.sections.push(heroData);
    }

    // Get all main sections
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    sections.forEach((section, index) => {
      const sectionData = {
        type: `Section ${index + 1}`,
        headings: [],
        paragraphs: [],
        lists: [],
        buttons: []
      };

      // Get headings
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
        const headings = section.querySelectorAll(tag);
        headings.forEach(h => {
          const text = cleanText(h.innerText);
          if (text) sectionData.headings.push({ level: tag.toUpperCase(), text });
        });
      });

      // Get paragraphs
      const paras = section.querySelectorAll('p');
      paras.forEach(p => {
        const text = cleanText(p.innerText);
        if (text && text.length > 10) sectionData.paragraphs.push(text);
      });

      // Get lists
      const lists = section.querySelectorAll('ul, ol');
      lists.forEach(list => {
        const items = [];
        list.querySelectorAll('li').forEach(li => {
          const text = cleanText(li.innerText);
          if (text) items.push(text);
        });
        if (items.length > 0) sectionData.lists.push(items);
      });

      // Get buttons/CTAs
      const buttons = section.querySelectorAll('a, button');
      buttons.forEach(btn => {
        const text = cleanText(btn.innerText);
        if (text && text.length > 0 && text.length < 100) {
          sectionData.buttons.push(text);
        }
      });

      // Only add section if it has content
      if (sectionData.headings.length > 0 || sectionData.paragraphs.length > 0 || sectionData.lists.length > 0) {
        result.sections.push(sectionData);
      }
    });

    // Get all visible text as fallback
    result.allVisibleText = cleanText(document.body.innerText);

    return result;
  });

  // Print structured content
  console.log(`Page Title: ${content.pageTitle}\n`);
  console.log(`URL: ${content.url}\n`);

  content.sections.forEach((section, idx) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${section.type}`);
    console.log('='.repeat(60));

    if (section.headings.length > 0) {
      console.log('\nHEADINGS:');
      section.headings.forEach(h => {
        console.log(`  ${h.level}: ${h.text}`);
      });
    }

    if (section.paragraphs.length > 0) {
      console.log('\nPARAGRAPHS:');
      section.paragraphs.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p}`);
      });
    }

    if (section.lists && section.lists.length > 0) {
      console.log('\nLISTS:');
      section.lists.forEach((list, i) => {
        console.log(`  List ${i + 1}:`);
        list.forEach(item => {
          console.log(`    - ${item}`);
        });
      });
    }

    if (section.buttons.length > 0) {
      console.log('\nBUTTONS/CTAs:');
      section.buttons.forEach(btn => {
        console.log(`  - ${btn}`);
      });
    }
  });

  console.log('\n\n========================================');
  console.log('FULL PAGE TEXT (for reference)');
  console.log('========================================\n');
  console.log(content.allVisibleText);

  await browser.close();
})();
