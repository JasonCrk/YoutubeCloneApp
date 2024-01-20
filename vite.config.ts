/// <reference types='vitest' />
/// <reference types='Vite/client' />

import { defineConfig } from 'vite'
import path from 'path'

import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/dist/config.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    exclude: [...configDefaults.exclude],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts']
  }
})
