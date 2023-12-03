/// <reference types='vitest' />

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@features': '/src/features',
      '@models': '/src/models',
      '@contexts': '/src/contexts',
      '@theme': '/src/theme',
    },
  },
  test: {
    environment: 'jsdom',
  },
})
