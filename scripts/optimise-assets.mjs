import sharp from 'sharp';
import { readdir, rm } from 'node:fs/promises';

const directory = 'public/images';
for (const file of await readdir(directory)) {
  if (!/\.(jpg|png)$/.test(file)) continue;
  const name = file.replace(/\.(jpg|png)$/, '');
  const image = sharp(`${directory}/${file}`).rotate();
  await image.clone().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 83, effort: 6 }).toFile(`${directory}/${name}.webp`);
  if (name !== 'chef') await image.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`${directory}/${name}-small.webp`);
  await rm(`${directory}/${file}`);
  console.log(`Optimised ${name}`);
}
