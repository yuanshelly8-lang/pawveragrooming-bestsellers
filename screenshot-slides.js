const { chromium } = require('playwright');
const path = require('path');
const sharp = require('sharp');

async function screenshotSlides() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const slidesDir = path.join(__dirname, 'slides');
  const assetsDir = path.join(__dirname, 'assets');

  const slideFiles = [
    'slide01-cover.html',
    'slide03-rhinestone.html',
    'slide07-advantages.html',
    'slide09-cta.html',
  ];

  const screenshots = [];

  for (let i = 0; i < slideFiles.length; i++) {
    const file = slideFiles[i];
    const page = await browser.newPage();
    await page.setViewportSize({ width: 960, height: 540 });
    await page.goto(`file:///${path.join(slidesDir, file).replace(/\\/g, '/')}`);

    // Set the background from assets
    const bgMap = {
      'slide01-cover.html': 'cover-bg.png',
      'slide03-rhinestone.html': 'sparkle-bg.png',
      'slide07-advantages.html': 'sparkle-bg.png',
      'slide09-cta.html': 'cta-bg.png',
    };

    if (bgMap[file]) {
      const bgPath = path.join(assetsDir, bgMap[file]).replace(/\\/g, '/');
      await page.evaluate((bg) => {
        document.body.style.backgroundImage = `url('file:///${bg}')`;
        document.body.style.backgroundSize = 'cover';
      }, bgPath);
      await page.waitForTimeout(500);
    }

    const screenshotPath = path.join(__dirname, `preview-${i + 1}.png`);
    await page.screenshot({ path: screenshotPath });
    screenshots.push(screenshotPath);
    console.log(`Screenshot: ${file} -> preview-${i + 1}.png`);
    await page.close();
  }

  // Create a grid image using sharp
  const gridWidth = 960 * 2;
  const gridHeight = 540 * 2;
  const images = [];
  for (let i = 0; i < screenshots.length; i++) {
    const buf = await sharp(screenshots[i]).resize(960, 540).toBuffer();
    images.push({
      input: buf,
      left: (i % 2) * 960,
      top: Math.floor(i / 2) * 540
    });
  }

  await sharp({
    create: {
      width: gridWidth,
      height: gridHeight,
      channels: 3,
      background: { r: 10, g: 10, b: 10 }
    }
  })
  .composite(images)
  .jpeg({ quality: 90 })
  .toFile(path.join(__dirname, 'catalog-preview.jpg'));

  console.log('Preview grid saved to catalog-preview.jpg');
  await browser.close();
}

screenshotSlides().catch(console.error);
