import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const pages = fs.readdirSync(new URL('pages', import.meta.url));

const rolldownInputOptions = {
  index: fileURLToPath(new URL('index.html', import.meta.url)),
  ...Object.fromEntries(
    pages.map((page) => [
      page,
      fileURLToPath(new URL(`pages/${page}`, import.meta.url)),
    ]),
  ),
};

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  build: {
    target: 'esnext',
    rolldownOptions: {
      input: rolldownInputOptions,
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: 'node_modules/',
            },
          ],
        },
      },
    },
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react()],
  test: {
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    typecheck: {
      enabled: true,
    },
  },
});
