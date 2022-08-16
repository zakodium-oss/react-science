import { defineConfig, UserConfig } from 'vitest/config';
import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

/*
  Part of the config shared with storybook.
*/
export const sharedConfig: UserConfig = {
  base: process.env.VITE_BASE || '/',
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react(), splitVendorChunkPlugin()],
};

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,
  test: {
    globals: true,
    dir: 'src',
  },
});
