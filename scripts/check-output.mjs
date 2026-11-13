import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.SITE_BASE ?? '/brentgibson/';
const pages = ['index.html', 'projects/ensemble/index.html', 'projects/folio/index.html'];
const redirects = [
  ['projects/agent-roster/index.html', 'projects/ensemble/'],
  ['projects/agent-memory/index.html', 'projects/folio/'],
];
const origin = 'https://portfolio.invalid';
const root = resolve('dist');
let checked = 0;
for (const page of [...pages, ...redirects.map(([path]) => path)]) {
  const html = await readFile(resolve(root, page), 'utf8');
  if (!html.includes('<h1>') || !html.includes('<main')) throw new Error(`${page} is not pre-rendered`);
  if (/link pending|TODO|github\.com\/BGibson1618/.test(html)) throw new Error(`Placeholder or incorrect URL in ${page}`);
  const pageURL = new URL(base + page, origin);
  for (const [, link] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const url = new URL(link, pageURL);
    if (url.origin !== origin) continue;
    if (!url.pathname.startsWith(base)) throw new Error(`Link escapes site base: ${link}`);
    let local = decodeURIComponent(url.pathname.slice(base.length));
    if (!local || local.endsWith('/')) local += 'index.html';
    const target = resolve(root, local);
    if (!target.startsWith(root + '/')) throw new Error(`Link escapes output: ${link}`);
    if (!(await stat(target)).isFile()) throw new Error(`Missing link target ${target}`);
    if (url.hash && target.endsWith('.html')) {
      const dest = await readFile(target, 'utf8');
      if (!dest.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw new Error(`Missing anchor ${link}`);
    }
    checked++;
  }
}
for (const [path, destination] of redirects) {
  const html = await readFile(resolve(root, path), 'utf8');
  if (!html.includes(`http-equiv="refresh" content="0; url=${base}${destination}"`)) {
    throw new Error(`Incorrect redirect at ${path}`);
  }
}
const resume = await readFile(resolve(root, 'brent-gibson-resume.pdf'));
if (resume.subarray(0, 5).toString() !== '%PDF-') throw new Error('Resume is not a PDF');
// Social crawlers read the initial HTML, without running React. Check the built
// metadata against the actual PNGs so a missing asset or stale size fails CI.
for (const project of ['ensemble', 'folio']) {
  const html = await readFile(resolve(root, `projects/${project}/index.html`), 'utf8');
  const tags = new Map([...html.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]+)"/g)]
    .map(([, name, value]) => [name, value]));
  const publicBase = `https://bgibson1618.github.io${base}`;
  const pageURL = `${publicBase}projects/${project}/`;
  const imageURL = `${publicBase}social/${project}-v1.png`;
  if (tags.get('og:url') !== pageURL || !html.includes(`<link rel="canonical" href="${pageURL}"`)) {
    throw new Error(`Incorrect public page URL for ${project}`);
  }
  if (tags.get('og:image') !== imageURL || tags.get('twitter:image') !== imageURL) {
    throw new Error(`Incorrect social image URL for ${project}`);
  }
  if (tags.get('twitter:card') !== 'summary_large_image' || tags.get('og:image:type') !== 'image/png'
      || !tags.get('og:image:alt') || tags.get('og:image:alt') !== tags.get('twitter:image:alt')) {
    throw new Error(`Missing or inconsistent social image metadata for ${project}`);
  }
  const png = await readFile(resolve(root, `social/${project}-v1.png`));
  if (png.length < 24 || png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`Social image for ${project} is not a PNG`);
  }
  if (Number(tags.get('og:image:width')) !== png.readUInt32BE(16)
      || Number(tags.get('og:image:height')) !== png.readUInt32BE(20)) {
    throw new Error(`Social image dimensions do not match the PNG for ${project}`);
  }
}
console.log(`Checked ${pages.length} pre-rendered pages, ${redirects.length} redirects, ${checked} local links/assets, the resume PDF, and both social-preview images.`);
