import { defineConfig } from "vite";

export default defineConfig({
  // ... other config
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})