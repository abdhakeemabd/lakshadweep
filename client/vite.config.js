import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/vendor-api': {
        target: 'https://subdorsal-pretracheal-natashia.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vendor-api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/homepage-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/homepage-api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
    },
  },
})
