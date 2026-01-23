const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Capture all console messages
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push(`[${type.toUpperCase()}] ${text}`);
  });

  // Capture all network requests
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('headshots') || request.url().includes('_next/image')) {
      requests.push({
        url: request.url(),
        method: request.method(),
        status: 'pending'
      });
    }
  });

  // Capture responses
  page.on('response', response => {
    if (response.url().includes('headshots') || response.url().includes('_next/image')) {
      const req = requests.find(r => r.url === response.url());
      if (req) {
        req.status = response.status();
        req.statusText = response.statusText();
      }
    }
  });

  // Capture failed requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    if (request.url().includes('headshots') || request.url().includes('_next/image')) {
      failedRequests.push({
        url: request.url(),
        error: request.failure().errorText
      });
    }
  });

  try {
    console.log('Navigating to About page...');
    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto('http://localhost:3000/about', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for images
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n=== NETWORK REQUESTS FOR IMAGES ===\n');
    requests.forEach(req => {
      console.log(`URL: ${req.url}`);
      console.log(`Status: ${req.status} ${req.statusText || ''}`);
      console.log('---');
    });

    if (failedRequests.length > 0) {
      console.log('\n=== FAILED REQUESTS ===\n');
      failedRequests.forEach(req => {
        console.log(`URL: ${req.url}`);
        console.log(`Error: ${req.error}`);
        console.log('---');
      });
    }

    console.log('\n=== CONSOLE LOGS ===\n');
    consoleLogs.forEach(log => console.log(log));

    // Check if images are actually rendering
    console.log('\n=== IMAGE RENDERING CHECK ===\n');
    const imageCheck = await page.evaluate(() => {
      const results = [];
      const imgs = document.querySelectorAll('img[alt*="Smith"], img[alt*="Carmenatty"], img[alt*="Walker"]');

      imgs.forEach(img => {
        results.push({
          alt: img.alt,
          src: img.src,
          width: img.width,
          height: img.height,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          currentSrc: img.currentSrc
        });
      });

      return results;
    });

    imageCheck.forEach(img => {
      console.log(`${img.alt}:`);
      console.log(`  src: ${img.src}`);
      console.log(`  currentSrc: ${img.currentSrc}`);
      console.log(`  dimensions: ${img.width}x${img.height}`);
      console.log(`  natural: ${img.naturalWidth}x${img.naturalHeight}`);
      console.log(`  complete: ${img.complete}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
