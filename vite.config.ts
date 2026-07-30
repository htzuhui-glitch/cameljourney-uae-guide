import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 部署在 GitHub Pages 的子路徑底下，base 必須是 repo 名稱
export default defineConfig({
  base: '/cameljourney-uae-guide/',
  plugins: [react(), tailwindcss()],
})
