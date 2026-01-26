const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to homepage...');
  await page.goto('https://www.clawpointsecuritycollective.com/', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Take a full page screenshot
  await page.screenshot({
    path: 'homepage-contact-crawl.png',
    fullPage: true
  });

  console.log('Screenshot saved as homepage-contact-crawl.png');

  // Extract all text content
  const bodyText = await page.evaluate(() => document.body.innerText);

  // Extract all links
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href
    }));
  });

  // Look for email patterns
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = bodyText.match(emailRegex) || [];

  // Look for phone patterns
  const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phones = bodyText.match(phoneRegex) || [];

  // Look for social media links
  const socialLinks = links.filter(link =>
    link.href.includes('linkedin.com') ||
    link.href.includes('twitter.com') ||
    link.href.includes('facebook.com') ||
    link.href.includes('instagram.com') ||
    link.href.includes('youtube.com')
  );

  // Look for contact-related links
  const contactLinks = links.filter(link =>
    link.text.toLowerCase().includes('contact') ||
    link.text.toLowerCase().includes('email') ||
    link.text.toLowerCase().includes('call') ||
    link.text.toLowerCase().includes('schedule') ||
    link.text.toLowerCase().includes('book')
  );

  // Look for address patterns
  const addressKeywords = bodyText.match(/\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way)[,\s]+[A-Za-z\s]+,\s+[A-Z]{2}\s+\d{5}/gi) || [];

  // Extract footer content
  const footerContent = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    return footer ? footer.innerText : 'No footer found';
  });

  const report = {
    timestamp: new Date().toISOString(),
    url: 'https://www.clawpointsecuritycollective.com/',
    emails: [...new Set(emails)],
    phones: [...new Set(phones)],
    addresses: addressKeywords,
    socialLinks: socialLinks,
    contactLinks: contactLinks,
    footerContent: footerContent,
    allLinks: links.slice(0, 50) // First 50 links to avoid too much data
  };

  fs.writeFileSync('contact-info-extraction.json', JSON.stringify(report, null, 2));
  console.log('\nContact Information Found:');
  console.log('=========================');
  console.log('Emails:', report.emails);
  console.log('Phones:', report.phones);
  console.log('Addresses:', report.addresses);
  console.log('Social Links:', report.socialLinks.length);
  console.log('Contact Links:', report.contactLinks);
  console.log('\nFull report saved to contact-info-extraction.json');

  await browser.close();
})();
