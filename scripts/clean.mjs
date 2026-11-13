import { lstat, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const targets = ['dist', '.vite'].map(name => resolve(root, name));
console.log('Reproducible output only:\n' + targets.join('\n'));
if (!process.argv.includes('--apply')) { console.log('Preview only. Add --apply to remove these generated directories.'); }
else {
  for (const path of targets) {
    try { if ((await lstat(path)).isSymbolicLink()) throw new Error(`Refusing a symlink: ${path}`); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    await rm(path, { recursive: true, force: false });
  }
}
