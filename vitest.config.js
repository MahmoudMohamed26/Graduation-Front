import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enable Jest-like global functions (describe, it, etc.)
    environment: 'jsdom', // Simulate a browser environment
    coverage: {
      provider: 'v8', // You can also use 'c8' for coverage
    },
  },
});