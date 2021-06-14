import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: "./",
  build: {
    outDir: join(__dirname, "dist/render")
  }
})
