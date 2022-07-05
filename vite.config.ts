import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react()],
  test: {
    globals: true,
    dir: 'src',
  },
});
