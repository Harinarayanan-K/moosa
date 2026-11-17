// Run only when refreshing the illustrative stock assets. Production makes no
// external image or font requests: all files are bundled in public/.
import { writeFile, mkdir, access } from 'node:fs/promises';

const sources = {
  biryani: 'photo-1563379091339-03b21ab4a4f8',
  garden: 'photo-1512621776951-a57141f2eefd',
  table: 'photo-1414235077428-338989a2e8c0',
};
await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
const outcomes = await Promise.allSettled([
  ...Object.entries(sources).map(async ([name, photo]) => {
    try { await access(`public/images/${name}.jpg`); return; } catch { /* Download missing assets. */ }
    const url = `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1400&q=85`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    await writeFile(`public/images/${name}.jpg`, Buffer.from(await response.arrayBuffer()));
    console.log(`Downloaded ${name}`);
  }),
]);
for (const result of outcomes) if (result.status === 'rejected') throw result.reason;
