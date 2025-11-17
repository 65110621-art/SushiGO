import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // ถ้า deploy ใต้โฟลเดอร์ย่อย ให้ตั้ง base เช่น base: '/sushigo/'
  // base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true }, // ให้ SW ทำงานตอน dev (ช่วยเทส)
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'SushiGo! – สั่งออนไลน์',
        short_name: 'SushiGo',
        description: 'เว็บสั่งอาหาร SushiGo! แบบติดตั้งได้ (PWA)',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#dc2626',
        background_color: '#ffffff',
        icons: [
          { src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
})
