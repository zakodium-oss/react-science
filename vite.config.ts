import { defineConfig } from 'vitest/config';
import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react(), splitVendorChunkPlugin()],
  test: {
    globals: true,
    dir: 'src',
  },
});
