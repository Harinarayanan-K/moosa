import sharp from 'sharp';
import { readFile, stat } from 'node:fs/promises';

// Generated originals remain untouched. The site serves only local WebP files.
const promptFiles = ['menu-premium-prompts.json', 'mini-burger-prompts.json', 'fusion-menu-prompts.json'];
const sets = await Promise.all(promptFiles.map(file => readFile(`output/imagegen/${file}`, 'utf8').then(JSON.parse)));
const entries = sets.flatMap(set => set.entries);
const requested = process.argv.slice(2);
for (const entry of entries.filter(entry => !requested.length || requested.includes(entry.slug))) {
  const name = entry.asset ?? `menu-premium-${entry.slug}`;
  const original = entry.source ?? `output/imagegen/${name}.png`;
  await stat(original); // Fail on a missing source rather than silently ship old imagery.
  for (const width of [1400, 640]) {
    await sharp(original)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width === 640 ? 82 : 86, effort: 6 })
      .toFile(`public/images/${name}${width === 640 ? '-small' : ''}.webp`);
  }
  console.log(`Optimised ${entry.name}`);
}
