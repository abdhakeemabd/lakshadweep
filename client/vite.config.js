import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'vite.svg'],
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      manifest: {
        name: 'GOROGUE',
        short_name: 'GoRogue',
        description: 'Welcome to GOROGUE - Your travel companion',
        theme_color: '#0F2446',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/gorogue-logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/gorogue-logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: '/gorogue-logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,webp,jpg,jpeg,gif}'],
        maximumFileSizeToCacheInBytes: 10000000, // Increase to 10MB to be safe
      },
    })
  ],
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
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vendor-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/homepage-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/homepage-api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/notification-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notification-api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
       '/slot-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slot-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/package-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/package-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/customer-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/customer-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },

      '/category-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/category-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/setting-api': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/setting-api/, ''),
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/settings': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/media': {
        target: 'https://bright-cunning-buffalo.ngrok-free.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },

    },
  },
})
