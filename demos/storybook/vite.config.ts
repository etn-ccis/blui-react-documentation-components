import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    mainFields: ['main:dev', 'module', 'main']
  },
  plugins: [react()],
})
