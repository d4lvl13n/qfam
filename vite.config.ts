import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Don't intercept Vite internal routes
          if (req.url?.startsWith('/@') || req.url?.startsWith('/node_modules')) {
            return next()
          }
          // Only handle routes without file extensions
          if (req.url && !req.url.includes('.') && req.url !== '/') {
            req.url = '/index.html'
          }
          next()
        })
      }
    }
  ],
  base: '/',
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
