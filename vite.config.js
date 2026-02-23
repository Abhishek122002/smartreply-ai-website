import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({

  resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://backend.dodraft.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
