import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { legacyPaths, pagePaths, pageUrl, siteBase, type Page } from '../src/paths';

const base = siteBase(process.env.SITE_BASE);
for (const [page, route] of Object.entries(pagePaths)) {
  const file = resolve('dist', route, 'index.html');
  const template = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!template.includes(marker)) throw new Error(`Missing root marker in ${file}`);
  const html = renderToString(<App page={page as Page} base={base} />);
  await writeFile(file, template.replace(marker, `<div id="root">${html}</div>`));
}
// Keep existing bookmarks working on static hosts, including without JavaScript.
for (const [page, route] of Object.entries(legacyPaths)) {
  const target = pageUrl(base, page as Page);
  const directory = resolve('dist', route);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Project page moved — Brent Gibson</title>
<link rel="canonical" href="https://bgibson1618.github.io${target}" />
<meta http-equiv="refresh" content="0; url=${target}" />
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head><body><main><h1>This project page has moved</h1>
<p><a href="${target}">Continue to the project page</a>.</p></main></body></html>`);
}
await writeFile(resolve('dist', '.nojekyll'), '');
console.log('Pre-rendered home, both project pages and two legacy redirects.');
