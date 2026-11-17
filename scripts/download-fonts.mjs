import { writeFile } from 'node:fs/promises';

const response = await fetch('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..600;1,400..600&family=DM+Sans:wght@400..600&display=swap', { headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' } });
if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
const css = await response.text();
const blocks = css.match(/@font-face\s*\{[^}]+\}/g) ?? [];
const targets = [
  ['cormorant', 'Cormorant Garamond', 'normal'],
  ['cormorant-italic', 'Cormorant Garamond', 'italic'],
  ['dm-sans', 'DM Sans', 'normal'],
];
for (const [name, family, style] of targets) {
  const block = blocks.find(b => b.includes(`'${family}'`) && b.includes(`font-style: ${style}`) && b.includes('U+0000-00FF'));
  const url = block?.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`Missing Latin font: ${name}`);
  const file = await fetch(url);
  if (!file.ok) throw new Error(`Font download: ${name}`);
  await writeFile(`public/fonts/${name}.woff2`, Buffer.from(await file.arrayBuffer()));
  console.log(`Saved ${name}.woff2`);
}
