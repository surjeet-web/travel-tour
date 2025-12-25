import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Performance optimizations
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-simple-star-rating', 'react-paginate'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          swiper: ['swiper'],
          utils: ['react-use', 'react-hot-toast', '@tanstack/react-query']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  
  // Development optimizations
  server: {
    hmr: {
      overlay: false,
    },
  },
  
  // Resolve optimizations
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@data': resolve(__dirname, 'src/data'),
      '@redux': resolve(__dirname, 'src/redux'),
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-simple-star-rating',
      'react-paginate',
      '@reduxjs/toolkit',
      'react-redux',
      'swiper',
      'react-use',
      'react-hot-toast',
      '@tanstack/react-query'
    ],
  },
})
