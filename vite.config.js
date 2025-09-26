import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',   // ✅ GitHub Pages বা Netlify এর জন্য relative path
});
