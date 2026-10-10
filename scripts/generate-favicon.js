const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicons() {
  const logoPath = path.join(__dirname, '../public/nirman-logo.png');
  const metadata = await sharp(logoPath).metadata();

  // Emblem is the top ~78% (the iconic building + roof + NBSB)
  const emblem = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: metadata.width, height: 195 })
    .toBuffer();

  // 1. Transparent 256x256 emblem icon
  const emblemResized = await sharp(emblem)
    .resize(236, 236, { fit: 'inside' })
    .toBuffer();

  const metaResized = await sharp(emblemResized).metadata();
  const left = Math.round((256 - metaResized.width) / 2);
  const top = Math.round((256 - metaResized.height) / 2);

  const transparent256 = await sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: emblemResized, top, left }])
  .png()
  .toBuffer();

  // Save standard icon files
  // Next.js App router icon.png (served as /icon.png)
  await sharp(transparent256)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../src/app/icon.png'));

  // Copy to public/icon.png and public/favicon-32x32.png
  await sharp(transparent256)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon.png'));

  await sharp(transparent256)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));

  // Apple touch icon (180x180 on clean white rounded background)
  const appleEmblem = await sharp(emblem)
    .resize(150, 150, { fit: 'inside' })
    .toBuffer();
  const appleMeta = await sharp(appleEmblem).metadata();
  const aLeft = Math.round((180 - appleMeta.width) / 2);
  const aTop = Math.round((180 - appleMeta.height) / 2);

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([{ input: appleEmblem, top: aTop, left: aLeft }])
  .png()
  .toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // Multi-size favicon.ico (32x32)
  const favBuffer = await sharp(transparent256)
    .resize(32, 32)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), favBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), favBuffer);

  console.log('All Nirman BSB favicons created successfully!');
}

createFavicons().catch(console.error);
