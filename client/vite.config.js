import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/vendor-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vendor-api/, ''),
        secure: false,
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
      '/notification-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notification-api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
       '/slot-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slot-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/package-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/package-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/customer-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/customer-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/notification-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notification-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/category-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/category-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/setting-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/setting-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/settings': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/media': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/homepage-api': {
        target: 'https://unexalting-bronchopneumonic-betsey.ngrok-free.dev',
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/homepage-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
    },
  },
})
