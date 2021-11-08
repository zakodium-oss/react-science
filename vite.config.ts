import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // TODO: https://github.com/Wildhoney/ReactShadow/pull/121
    global: 'globalThis',
  },
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react()],
});
