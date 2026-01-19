// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: './',        // use a relative base for assets
  plugins: [react()],
  build: {
    outDir: 'dist',  // or 'build'
    rollupOptions: {
      input: { main: './index.html' }  // ensure index.html is an entry
    }
  }
})
