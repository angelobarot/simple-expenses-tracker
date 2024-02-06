import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      "@Api/*": path.resolve(__dirname, 'src/api/*'),
      "@Common/*": path.resolve(__dirname, 'src/common/*'),
      "@Components/*": path.resolve(__dirname, 'src/components/*'),
      "@Dashboard/*": path.resolve(__dirname, 'src/dashboard/*')
    }
  }
})
