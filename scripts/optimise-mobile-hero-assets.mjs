import sharp from 'sharp';

// Mobile-specific generated compositions; resize only, preserving all plate edges.
const selected = process.argv.slice(2);
for (const region of selected.length ? selected : ['pumpkin', 'indian', 'italian', 'middle-eastern', 'european']) {
  const name = `hero-${region}-mobile`;
  for (const width of [900, 480]) {
    await sharp(`output/imagegen/${name}.png`).resize({ width, withoutEnlargement: true }).webp({ quality: width === 480 ? 82 : 86, effort: 6 }).toFile(`public/images/${name}${width === 480 ? '-small' : ''}.webp`);
  }
  const metadata = await sharp(`public/images/${name}.webp`).metadata();
  console.log(`${name}: ${metadata.width} × ${metadata.height}`);
}
