/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {coverageConfigDefaults} from "vitest/config";
import TanStackRouterVite from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true, // Enable global `describe`, `test`, etc.
    environment: 'jsdom', // Simulate browser-like environment
    setupFiles: './src/test/setup.ts', // Setup file for test (optional)
    "clearMocks": true,
    "restoreMocks": true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reportOnFailure: true,
      exclude: [
        'src/main.tsx',
        'src/routeTree.gen.ts',
        'src/test/utils/*',
        ...coverageConfigDefaults.exclude
      ],
    },
  },
})
