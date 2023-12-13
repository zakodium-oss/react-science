import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vitest/config';

const plugins = [react(), splitVendorChunkPlugin()];

const pages = fs.readdirSync(new URL('pages', import.meta.url));

const rollupOptions = {
  input: {
    index: fileURLToPath(new URL('index.html', import.meta.url)),
    ...Object.fromEntries(
      pages.map((page) => [
        page,
        fileURLToPath(new URL(`pages/${page}`, import.meta.url)),
      ]),
    ),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  esbuild: {
    jsx: 'automatic',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    rollupOptions,
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins,
  test: {
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
