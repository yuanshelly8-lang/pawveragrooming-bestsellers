const { chromium } = require('playwright');
const path = require('path');
const sharp = require('sharp');

async function screenshotRemaining() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const slidesDir = path.join(__dirname, 'slides');
  const assetsDir = path.join(__dirname, 'assets');

  const slideFiles = [
    { file: 'slide02-about.html', bg: 'gold-bar-bg.png' },
    { file: 'slide04-products.html', bg: 'section-bg.png' },
    { file: 'slide05-workshop.html', bg: 'gold-bar-bg.png' },
    { file: 'slide06-showroom.html', bg: 'section-bg.png' },
    { file: 'slide08-process.html', bg: 'gold-bar-bg.png' },
    { file: 'slide10-back.html', bg: 'back-bg.png' },
  ];

  const screenshots = [];

  for (let i = 0; i < slideFiles.length; i++) {
    const { file, bg } = slideFiles[i];
    const page = await browser.newPage();
    await page.setViewportSize({ width: 960, height: 540 });
    await page.goto(`file:///${path.join(slidesDir, file).replace(/\\/g, '/')}`);

    const bgPath = path.join(assetsDir, bg).replace(/\\/g, '/');
    await page.evaluate((bgp) => {
      document.body.style.backgroundImage = `url('file:///${bgp}')`;
      document.body.style.backgroundSize = 'cover';
    }, bgPath);
    await page.waitForTimeout(500);

    const screenshotPath = path.join(__dirname, `preview-rest-${i + 1}.png`);
    await page.screenshot({ path: screenshotPath });
    screenshots.push(screenshotPath);
    console.log(`Screenshot: ${file}`);
    await page.close();
  }

  // 3x2 grid
  const tw = 640, th = 360;
  const cols = 3, rows = 2;
  const images = [];
  for (let i = 0; i < screenshots.length; i++) {
    const buf = await sharp(screenshots[i]).resize(tw, th).toBuffer();
    images.push({
      input: buf,
      left: (i % cols) * tw,
      top: Math.floor(i / cols) * th
    });
  }

  await sharp({
    create: { width: tw * cols, height: th * rows, channels: 3, background: { r: 10, g: 10, b: 10 } }
  })
  .composite(images)
  .jpeg({ quality: 90 })
  .toFile(path.join(__dirname, 'catalog-preview-rest.jpg'));

  console.log('Preview grid saved to catalog-preview-rest.jpg');
  await browser.close();
}

screenshotRemaining().catch(console.error);
