const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

// Monkey-patch playwright to use system Chrome on Windows
const origLaunch = chromium.launch.bind(chromium);
chromium.launch = function(opts = {}) {
  if (process.platform === 'win32') {
    opts.channel = 'chrome';
  }
  return origLaunch(opts);
};

// Monkey-patch html2pptx's addElements to handle data: URIs and Windows file:/// paths
const html2pptxPath = path.join(__dirname, '..', 'agent-core', 'skills', 'pptx', 'scripts', 'html2pptx.js');
let html2pptxCode = fs.readFileSync(html2pptxPath, 'utf8');

// Fix Windows file:/// path handling (file:///C:/... -> C:/...)
html2pptxCode = html2pptxCode.replace(
  /let imagePath = el\.src\.startsWith\('file:\/\/'\) \? el\.src\.replace\('file:\/\/'\, ''\) : el\.src;/g,
  `let imagePath = el.src;
      if (imagePath.startsWith('file:///')) {
        imagePath = imagePath.replace('file:///', '');
      } else if (imagePath.startsWith('file://')) {
        imagePath = imagePath.replace('file://', '');
      }
      // Handle data: URIs for pptxgenjs
      if (imagePath.startsWith('data:')) {
        targetSlide.addImage({
          data: imagePath,
          x: el.position.x,
          y: el.position.y,
          w: el.position.w,
          h: el.position.h
        });
        continue;
      }`
);

// Also fix background path
html2pptxCode = html2pptxCode.replace(
  /let imagePath = slideData\.background\.path\.startsWith\('file:\/\/'\)\s*\n\s*\? slideData\.background\.path\.replace\('file:\/\/'\, ''\)\s*\n\s*: slideData\.background\.path;/,
  `let imagePath = slideData.background.path;
    if (imagePath.startsWith('file:///')) {
      imagePath = imagePath.replace('file:///', '');
    } else if (imagePath.startsWith('file://')) {
      imagePath = imagePath.replace('file://', '');
    }`
);

// Write fixed version temporarily
const fixedPath = path.join(__dirname, 'html2pptx-fixed.js');
fs.writeFileSync(fixedPath, html2pptxCode);
const html2pptx = require(fixedPath);

const assetsDir = path.join(__dirname, 'assets');

const slideBgs = {
  0: path.join(assetsDir, 'cover-bg.png'),
  1: path.join(assetsDir, 'gold-bar-bg.png'),
  2: path.join(assetsDir, 'sparkle-bg.png'),
  3: path.join(assetsDir, 'section-bg.png'),
  4: path.join(assetsDir, 'gold-bar-bg.png'),
  5: path.join(assetsDir, 'section-bg.png'),
  6: path.join(assetsDir, 'sparkle-bg.png'),
  7: path.join(assetsDir, 'gold-bar-bg.png'),
  8: path.join(assetsDir, 'cta-bg.png'),
  9: path.join(assetsDir, 'back-bg.png'),
};

async function buildCatalog() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'MIIN';
  pptx.title = 'MIIN Product Catalog 2025-2026';
  pptx.subject = 'Crystal & Rhinestone Customization';
  pptx.company = 'MIIN';

  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = [
    'slide01-cover.html',
    'slide02-about.html',
    'slide03-rhinestone.html',
    'slide04-products.html',
    'slide05-workshop.html',
    'slide06-showroom.html',
    'slide07-advantages.html',
    'slide08-process.html',
    'slide09-cta.html',
    'slide10-back.html'
  ];

  let slideIndex = 0;
  for (const file of slideFiles) {
    const htmlPath = path.join(slidesDir, file);
    console.log(`Processing: ${file}`);
    try {
      const { slide } = await html2pptx(htmlPath, pptx);
      if (slideBgs[slideIndex]) {
        slide.background = { path: slideBgs[slideIndex] };
      }
      console.log(`  OK: ${file}`);
    } catch (err) {
      console.error(`  ERR: ${file}: ${err.message}`);
    }
    slideIndex++;
  }

  const outputPath = path.join(__dirname, 'MIIN-Catalog-2025.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\nCatalog saved to: ${outputPath}`);

  // Cleanup
  fs.unlinkSync(fixedPath);
}

buildCatalog().catch(console.error);
