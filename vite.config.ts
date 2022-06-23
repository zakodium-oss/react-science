import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: process.env.NO_MINIFY ? false : 'esbuild',
  },
  plugins: [react()],
});
