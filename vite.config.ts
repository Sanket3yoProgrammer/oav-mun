import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches Vercel's output directory
  },
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
  server: {
    port: 3000, // Ensure no conflicts with Vercel's settings
  },
});
