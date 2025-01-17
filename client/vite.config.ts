import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://trail-finder-washington-server.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips the "/api" prefix before forwarding
      },
    },
  },
});
