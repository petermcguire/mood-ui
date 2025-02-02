/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {coverageConfigDefaults} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global `describe`, `test`, etc.
    environment: 'jsdom', // Simulate browser-like environment
    setupFiles: './src/test/setup.ts', // Setup file for test (optional)
    coverage: {
      enabled: true,
      provider: 'v8',
      reportOnFailure: true,
      exclude: [
        'src/main.tsx',
        ...coverageConfigDefaults.exclude
      ],
    },
  },
})
