import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Optimizaciones de build
  build: {
    // Reducir el tamaño del bundle
    target: 'es2015',
    minify: 'terser',
    
    // Code splitting mejorado
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    
    // Optimizaciones adicionales
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Tamaño de chunk warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Optimizaciones de desarrollo
  server: {
    open: true
  },
  
  // Optimización de assets
  assetsInclude: ['**/*.woff', '**/*.woff2']
})
