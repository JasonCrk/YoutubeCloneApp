/// <reference types='vitest' />
/// <reference types='Vite/client' />

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/dist/config.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/utils': '/src/utils',
      '@/hooks': '/src/hooks',
      '@/services': '/src/services',
      '@/features': '/src/features',
      '@/models': '/src/models',
      '@/contexts': '/src/contexts',
      '@/theme': '/src/theme',
      '@/assets': '/src/assets',
      '@/store': '/src/store',
      '@/config': '/src/config',
      '@/mocks': '/src/mocks',
      '@/router': '/src/router'
    }
  },
  test: {
    exclude: [...configDefaults.exclude],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts']
  }
})
