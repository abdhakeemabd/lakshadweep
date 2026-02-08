import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/vendor-api': {
        target: 'https://z71mwq0q-8000.inc1.devtunnels.ms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vendor-api/, ''),
        headers: {
          'X-Tunnel-Skip-AntiPhishing-Page': 'true',
        },
      },
      '/homepage-api': {
        target: 'https://z71mwq0q-8000.inc1.devtunnels.ms/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/homepage-api/, ''),
        headers: {
          'X-Tunnel-Skip-AntiPhishing-Page': 'true',
        },
      },
    },
  },
})
