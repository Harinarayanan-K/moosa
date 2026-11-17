import sharp from 'sharp';

// Keep the generated originals; publish resized WebP derivatives without any crop.
const selected = process.argv.slice(2);
for (const region of selected.length ? selected : ['pumpkin', 'indian', 'italian', 'middle-eastern', 'european']) {
  const name = `hero-${region}-wide`;
  for (const width of [1600, 640]) {
    const target = `public/images/${name}${width === 640 ? '-small' : ''}.webp`;
    await sharp(`output/imagegen/${name}.png`).resize({ width, withoutEnlargement: true }).webp({ quality: width === 640 ? 81 : 86, effort: 6 }).toFile(target);
  }
  const info = await sharp(`public/images/${name}.webp`).metadata();
  console.log(`${name}: ${info.width} × ${info.height}`);
}
