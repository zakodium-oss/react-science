import fs from 'node:fs';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vitest/config';

const isInLadle = process.env.VITE_PUBLIC_LADLE_THEME;

const plugins = [react(), splitVendorChunkPlugin()];

const pages = fs.readdirSync(path.join(__dirname, 'pages'));

const rollupOptions = !isInLadle
  ? {
      input: {
        index: path.join(__dirname, 'index.html'),
        ...Object.fromEntries(
          pages.map((page) => [page, path.join(__dirname, 'pages', page)]),
        ),
      },
    }
  : undefined;

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    rollupOptions,
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins,
  test: {
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
