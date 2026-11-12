import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.SITE_BASE ?? '/brentgibson/';
const pages = ['index.html', 'projects/agent-roster/index.html', 'projects/agent-memory/index.html'];
const origin = 'https://portfolio.invalid';
const root = resolve('dist');
let checked = 0;
for (const page of pages) {
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
const resume = await readFile(resolve(root, 'brent-gibson-resume.pdf'));
if (resume.subarray(0, 5).toString() !== '%PDF-') throw new Error('Resume is not a PDF');
console.log(`Checked ${pages.length} pre-rendered pages, ${checked} local links/assets, and the resume PDF.`);
