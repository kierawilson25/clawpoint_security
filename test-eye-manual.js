const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Starting MANUAL eye tracking verification...\n');
  console.log('This test will keep the browser OPEN for you to manually inspect.\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080', '--start-maximized']
  });

  const page = await browser.newPage();

  try {
    console.log('📍 Navigating to Infinite View page...');
    await page.goto('http://localhost:3000/infinite-view', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n✅ Page loaded!\n');

    // Inject a visual debug overlay
    await page.evaluate(() => {
      // Create debug panel
      const panel = document.createElement('div');
      panel.id = 'debug-panel';
      panel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff41;
        padding: 20px;
        border: 2px solid #00ff41;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        z-index: 10000;
        min-width: 300px;
      `;

      panel.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #00ff41; font-size: 16px; border-bottom: 1px solid #00ff41; padding-bottom: 5px;">🎯 EYE TRACKING DEBUG</h3>
        <div id="mouse-pos">Mouse: 0, 0</div>
        <div id="pupil-pos">Pupil: 0, 0</div>
        <div id="pupil-transform">Transform: none</div>
        <div id="blink-status">Blink: No</div>
        <div id="eye-center">Eye Center: 0, 0</div>
        <hr style="border-color: #00ff41; margin: 10px 0;">
        <div style="font-size: 12px; color: #88ff88;">
          ✓ Move mouse to test tracking<br>
          ✓ Wait for blink (2-5 sec)<br>
          ✓ Check pupil movement
        </div>
      `;

      document.body.appendChild(panel);

      // Track mouse movement
      let lastMouseX = 0;
      let lastMouseY = 0;

      document.addEventListener('mousemove', (e) => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        document.getElementById('mouse-pos').textContent = `Mouse: ${e.clientX}, ${e.clientY}`;
      });

      // Monitor pupil
      setInterval(() => {
        const pupilContainer = document.querySelector('.absolute.inset-0.flex.items-center.justify-center.transition-transform');
        const eye = document.querySelector('.w-72.h-56');

        if (pupilContainer) {
          const style = window.getComputedStyle(pupilContainer);
          const transform = style.transform;
          document.getElementById('pupil-transform').textContent = `Transform: ${transform}`;

          // Parse transform matrix to get x, y
          const match = transform.match(/matrix\\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\\)/);
          if (match) {
            const x = parseFloat(match[5]).toFixed(2);
            const y = parseFloat(match[6]).toFixed(2);
            document.getElementById('pupil-pos').textContent = `Pupil Offset: ${x}px, ${y}px`;
          }
        }

        if (eye) {
          const rect = eye.getBoundingClientRect();
          const centerX = Math.round(rect.left + rect.width / 2);
          const centerY = Math.round(rect.top + rect.height / 2);
          document.getElementById('eye-center').textContent = `Eye Center: ${centerX}, ${centerY}`;
        }

        // Detect blink by checking eyelid transform
        const eyelid = document.querySelector('.absolute.inset-0.bg-black.transition-all');
        if (eyelid) {
          const eyelidStyle = window.getComputedStyle(eyelid);
          const isBlinking = eyelidStyle.transform !== 'none';
          document.getElementById('blink-status').textContent = `Blink: ${isBlinking ? 'YES! 👁️' : 'No'}`;
          document.getElementById('blink-status').style.color = isBlinking ? '#ff0000' : '#00ff41';
        }
      }, 100);
    });

    console.log('📊 Debug panel injected into the page!\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('  MANUAL TESTING INSTRUCTIONS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('1. Look at the TOP RIGHT corner for the debug panel');
    console.log('2. Move your mouse around the page');
    console.log('3. Watch the "Pupil Offset" values change');
    console.log('4. Check if the pupil in the eye follows your cursor');
    console.log('5. Wait for the blink status to say "YES!"');
    console.log('6. Look closely for eyelashes around the eye');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n⏳ Browser will stay open. Press Ctrl+C to close when done.\n');

    // Keep the browser open indefinitely
    await new Promise(() => {});

  } catch (error) {
    console.error('❌ Error:', error);
    await browser.close();
  }
})();
