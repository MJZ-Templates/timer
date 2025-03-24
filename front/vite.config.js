import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
	port: 5173,
	allowedHosts: ['timer-front.ap-northeast-2.arkain.site'],
  },
  plugins: [react()],
})
