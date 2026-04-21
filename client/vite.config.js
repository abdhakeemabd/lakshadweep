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
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'GOROGUE',
        short_name: 'GoRogue',
        description: 'Welcome to GOROGUE',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /\/(?:homepage-api|vendor-api|api|slot-api|package-api|customer-api|category-api|setting-api)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          }
        ],
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
