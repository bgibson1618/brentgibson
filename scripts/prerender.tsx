import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { pagePaths, siteBase, type Page } from '../src/paths';

const base = siteBase(process.env.SITE_BASE);
for (const [page, route] of Object.entries(pagePaths)) {
  const file = resolve('dist', route, 'index.html');
  const template = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!template.includes(marker)) throw new Error(`Missing root marker in ${file}`);
  const html = renderToString(<App page={page as Page} base={base} />);
  await writeFile(file, template.replace(marker, `<div id="root">${html}</div>`));
}
await writeFile(resolve('dist', '.nojekyll'), '');
console.log('Pre-rendered home and both project pages.');
