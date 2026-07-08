import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    needsInterop: ['react-countup'],
  },
  build: {
    // Long-cache hashed assets; HTML stays fresh
    assetsInlineLimit: 4096,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules\/(react|react-dom|scheduler)\//,
              priority: 30,
            },
            {
              name: 'vendor-router',
              test: /node_modules\/react-router/,
              priority: 25,
            },
            {
              name: 'vendor-motion',
              test: /node_modules\/framer-motion/,
              priority: 20,
            },
            {
              name: 'vendor-icons',
              test: /node_modules\/lucide-react/,
              priority: 15,
            },
            {
              name: 'vendor-forms',
              test: /node_modules\/react-hook-form/,
              priority: 10,
            },
            {
              name: 'vendor-countup',
              test: /node_modules\/react-countup/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
