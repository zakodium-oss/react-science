import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const plugins = [react(), splitVendorChunkPlugin()];

if (!process.env.VITE_PUBLIC_LADLE_THEME) {
  plugins.push(tsconfigPaths());
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins,
  test: {
    globals: true,
    dir: 'src',
  },
});
