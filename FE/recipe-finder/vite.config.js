import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    outDir: 'dist',
  
    assetsInlineLimit: 4096,
    assetsDir: 'assets',
    
    minify: 'esbuild',
    manifest: true,
    
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    
    sourcemap: true
  },

  server: {
    port: 5173,
    host: 'localhost',
    open: true,
    https: false,
    proxy: {}
  }
})