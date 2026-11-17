// Build-time asset preparation only. Visitors never call Wikimedia APIs.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp';

const entries = [
  ['Appam & Vegetable Stew', 'Appam'],
  ['Kerala Chicken Roast', null, 'Kerala chicken roast'],
  ['Beef Ularthiyathu', 'Beef fry'],
  ['Karimeen Pollichathu', 'Karimeen pollichathu'],
  ['Malabar Prawn Curry', 'Prawn curry'],
  ['Thalassery Chicken Biryani', 'Thalassery biryani'],
  ['Puttu & Kadala Curry', 'Puttu'],
  ['Avial', 'Avial'],
  ['Ada Pradhaman', null, 'Ada pradhaman'],
  ['Butter Chicken', 'Butter chicken'],
  ['Chicken Tikka Masala', 'Chicken tikka masala'],
  ['Tandoori Chicken', 'Tandoori chicken'],
  ['Palak Paneer', 'Palak paneer'],
  ['Paneer Tikka', 'Paneer tikka'],
  ['Chole Masala', 'Chana masala'],
  ['Dal Makhani', 'Dal makhani'],
  ['Rogan Josh', 'Rogan josh'],
  ['Gulab Jamun', 'Gulab jamun'],
  ['Spaghetti Carbonara', 'Carbonara'],
  ['Tagliatelle al Ragù', 'Bolognese sauce'],
  ['Lasagna al Forno', 'Lasagna'],
  ['Risotto ai Funghi', null, 'Risotto ai funghi'],
  ['Gnocchi al Pomodoro', null, 'Gnocchi tomato sauce'],
  ['Pizza Margherita', 'Pizza Margherita'],
  ['Burrata & Heirloom Tomatoes', null, 'Burrata tomatoes'],
  ['Tiramisu', 'Tiramisu'],
  ['Vanilla Panna Cotta', 'Panna cotta'],
  ['Beef Bourguignon', 'Beef bourguignon'],
  ['Coq au Vin', 'Coq au vin'],
  ['Duck Confit', 'Confit de canard'],
  ['Beef Wellington', 'Beef Wellington'],
  ['Salmon en Croûte', null, 'Salmon en croute'],
  ['Ratatouille', 'Ratatouille'],
  ['Potato Gratin', 'Gratin dauphinois'],
  ['Crème Brûlée', 'Crème brûlée'],
  ['Chicken Shawarma', null, 'Chicken shawarma plate'],
  ['Shish Tawook', 'Shish taouk'],
  ['Falafel', 'Falafel'],
  ['Hummus', 'Hummus'],
  ['Baba Ganoush', 'Baba ghanoush'],
  ['Fattoush', 'Fattoush'],
  ['Tabbouleh', 'Tabbouleh'],
  ['Lamb Mandi', null, 'Mandi lamb -haneeth'],
  ['Kunafa', 'Knafeh'],
];
const headers = { 'User-Agent': 'MoosaPortfolioAssetPreparation/1.0 (static-site food photography; no runtime API)' };
const slug = name => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clean = html => String(html ?? '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim();
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
await mkdir('public/images', { recursive: true });
await mkdir('scripts/asset-cache', { recursive: true });
let credits = {};
try { credits = JSON.parse(await readFile('scripts/asset-cache/menu-photo-credits.json', 'utf8')); } catch {}
let discovery = {};
try { discovery = JSON.parse(await readFile('scripts/asset-cache/menu-photo-discovery.json', 'utf8')); } catch {}
// Reviewed selections override article thumbnails that may depict a side dish,
// contain lettering, or have an unsuitable crop/resolution for menu cards.
Object.assign(discovery, {
  'Thalassery Chicken Biryani': ['File:Thalassery biriyani in dining table (cropped).jpg'],
  'Lamb Mandi': ['File:Mandi Lamb Shank, Lepak @ Sultan, 62 Bussorah St, Singapore (01).jpg'],
  'Malabar Prawn Curry': ['File:Prawn curry with raw mango.jpg'],
  'Gulab Jamun': ['File:Bowl of Gulab Jamuns.jpg'],
});
const fileInfo = new Map();
const fileKey = title => (title.startsWith('File:') ? title : `File:${title}`).replaceAll('_', ' ').toLowerCase();
let lastApiRequest = 0;

async function json(endpoint, params) {
  const url = new URL(endpoint);
  url.search = new URLSearchParams({ format: 'json', ...params }).toString();
  let response;
  for (let attempt = 0; attempt < 4; attempt++) {
    const delay = Math.max(0, 1700 - (Date.now() - lastApiRequest));
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    lastApiRequest = Date.now();
    response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
    if (response.status !== 429) break;
    const pause = Math.min(30000, Math.max(5000, Number(response.headers.get('retry-after') || 10) * 1000));
    console.log(`Image catalogue is busy; retrying in ${pause / 1000}s.`);
    await new Promise(resolve => setTimeout(resolve, pause));
  }
  if (!response.ok) throw new Error(`Metadata HTTP ${response.status}`);
  const body = await response.json();
  if (body.error) throw new Error(JSON.stringify(body.error));
  return body;
}

async function metadata(title) {
  if (fileInfo.has(fileKey(title))) return parseMetadata(fileInfo.get(fileKey(title)));
  const body = await json('https://commons.wikimedia.org/w/api.php', {
    action: 'query', titles: title.startsWith('File:') ? title : `File:${title}`,
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '960',
  });
  return parseMetadata(Object.values(body.query?.pages ?? {})[0]);
}

function parseMetadata(page) {
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error('No Commons image metadata');
  const ext = info.extmetadata ?? {};
  const license = clean(ext.LicenseShortName?.value);
  if (!/CC BY|CC0|public domain/i.test(license)) throw new Error(`Unsupported licence: ${license}`);
  if (!/\.(jpe?g|png|webp)(\?|$)/i.test(info.url)) throw new Error('Not a raster photo');
  return { title: page.title, original: info.url, download: info.thumburl ?? info.url, source: info.descriptionurl, license, licenseUrl: ext.LicenseUrl?.value || info.descriptionurl, author: clean(ext.Artist?.value) || clean(ext.Credit?.value) || 'See original file page', description: clean(ext.ImageDescription?.value) };
}

async function discover() {
  const needed = entries.filter(([name]) => !credits[name] && !discovery[name]);
  const articles = needed.map(([, article]) => article).filter(Boolean);
  if (articles.length) {
    console.log(`Looking up ${articles.length} dishes in one catalogue request.`);
    const body = await json('https://en.wikipedia.org/w/api.php', { action: 'query', titles: articles.join('|'), redirects: '1', prop: 'pageimages', piprop: 'name', pilimit: '50' });
    const renames = new Map([...(body.query?.normalized ?? []), ...(body.query?.redirects ?? [])].map(item => [item.from, item.to]));
    const pages = Object.values(body.query?.pages ?? {});
    for (const [name, article] of needed.filter(([, article]) => article)) {
      let title = article;
      for (let i = 0; i < 6 && renames.has(title); i++) title = renames.get(title);
      const page = pages.find(page => page.title === title);
      if (page?.pageimage) discovery[name] = [page.pageimage];
    }
  }
  for (const [name, , query] of needed.filter(([name]) => !discovery[name])) {
    const body = await json('https://commons.wikimedia.org/w/api.php', { action: 'query', list: 'search', srnamespace: '6', srsearch: query || name, srlimit: '3' });
    discovery[name] = (body.query?.search ?? []).map(item => item.title);
    console.log(`Found candidates for ${name}`);
    await writeFile('scripts/asset-cache/menu-photo-discovery.json', JSON.stringify(discovery, null, 2));
  }
  await writeFile('scripts/asset-cache/menu-photo-discovery.json', JSON.stringify(discovery, null, 2));
  const files = [...new Set(entries.filter(([name]) => !credits[name]).flatMap(([name]) => discovery[name] ?? []))].map(title => title.startsWith('File:') ? title : `File:${title}`);
  for (let i = 0; i < files.length; i += 45) {
    console.log(`Reading licences for ${Math.min(45, files.length - i)} photographs.`);
    const body = await json('https://commons.wikimedia.org/w/api.php', { action: 'query', titles: files.slice(i, i + 45).join('|'), prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '960' });
    for (const page of Object.values(body.query?.pages ?? {})) fileInfo.set(fileKey(page.title), page);
  }
}

async function preparePhoto(entry) {
  const [name, article, query] = entry;
  const image = `menu-${slug(name)}`;
  if (credits[name]) {
    try { await access(`public/images/${image}.webp`); await access(`public/images/${image}-small.webp`); console.log(`Cached ${name}`); return; } catch {}
  }
  const failures = [];
  for (const candidate of discovery[name] ?? []) {
    try {
      const info = await metadata(candidate);
      let response;
      for (let attempt = 0; attempt < 4; attempt++) {
        response = await fetch(info.download, { headers, signal: AbortSignal.timeout(45000) });
        if (response.status !== 429) break;
        const pause = Math.min(30000, Math.max(5000, Number(response.headers.get('retry-after') || 10) * 1000));
        console.log(`Waiting ${pause / 1000}s before retrying ${name}.`);
        await new Promise(resolve => setTimeout(resolve, pause));
      }
      if (!response.ok) throw new Error(`Image HTTP ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      const photograph = sharp(data).rotate();
      const dimensions = await photograph.metadata();
      if ((dimensions.width ?? 0) < 300 || (dimensions.height ?? 0) < 200) throw new Error('Image too small');
      await photograph.clone().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 81, effort: 5 }).toFile(`public/images/${image}.webp`);
      await photograph.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(`public/images/${image}-small.webp`);
      credits[name] = { ...info, image, adaptations: 'Resized and converted to WebP; displayed with a crop. Adaptations use the same licence as the original.' };
      await writeFile('scripts/asset-cache/menu-photo-credits.json', JSON.stringify(credits, null, 2));
      console.log(`Saved ${name} | ${info.title} | ${info.license}`);
      return;
    } catch (error) { failures.push(`${candidate}: ${error.message}`); }
  }
  throw new Error(`${name}: ${failures.join(' / ') || 'No candidates found'}`);
}

// Two workers avoid hammering image servers and keep progress resumable.
await discover();
let cursor = 0;
const failures = [];
await Promise.all(Array.from({ length: 2 }, async () => {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    try { await preparePhoto(entry); } catch (error) { failures.push(error.message); console.log(`FAILED ${error.message}`); }
  }
}));
await writeFile('src/menu-photos.json', JSON.stringify(Object.fromEntries(Object.entries(credits).map(([name, item]) => [name, item.image])), null, 2));
await writeFile('public/menu-photo-credits.json', JSON.stringify(credits, null, 2));
const items = Object.entries(credits).map(([name, item]) => `<article><h2>${escape(name)}</h2><p>${escape(item.author)} · <a href="${escape(item.source)}">Original photograph</a> · <a href="${escape(item.licenseUrl)}">${escape(item.license)}</a></p><p>${escape(item.adaptations)}</p></article>`).join('\n');
await writeFile('public/photo-credits.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Photography credits — MOOSA</title><style>body{max-width:900px;margin:50px auto;padding:0 24px;background:#0d0c0a;color:#f3eee5;font:14px/1.8 system-ui}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:42px;color:#cba66a}h2{font-size:23px}a{color:#cba66a}article{padding:20px 0;border-top:1px solid #cba66a44}p{color:#b5aa99}a:focus-visible{outline:2px solid #cba66a;outline-offset:5px}</style></head><body><a href="./#menu">← Back to Moosa</a><h1>Photography credits</h1><p>All food photography is illustrative. The additional menu photographs below are reproduced under their stated licences. The cropped, resized WebP versions carry the same licences. The wide and mobile portrait hero photographs were generated with AI as illustrative regional food imagery, with complete serving plates visible. Existing featured dishes use illustrative generated images; the original biryani, garden and dining photographs are from Unsplash. The chef portrait was prepared from the supplied poster with AI assistance.</p>${items}</body></html>`);
console.log(`Completed ${Object.keys(credits).length}/${entries.length} menu photos.`);
if (failures.length) { console.log(failures.join('\n')); process.exitCode = 1; }
