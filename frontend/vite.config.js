import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/feed': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/swipe': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/matches': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/undo': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/reset': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/stats': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
