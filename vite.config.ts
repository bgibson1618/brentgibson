import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { siteBase } from './src/paths.ts';

export default defineConfig({
  base: siteBase(process.env.SITE_BASE),
  appType: 'mpa',
  plugins: [react(), tailwindcss()],
  server: { host: '127.0.0.1', port: 4173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    rolldownOptions: { input: {
      home: resolve(import.meta.dirname, 'index.html'),
      roster: resolve(import.meta.dirname, 'projects/ensemble/index.html'),
      memory: resolve(import.meta.dirname, 'projects/folio/index.html'),
    } },
  },
});
