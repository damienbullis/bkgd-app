import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, './src/components/_shared'),
      '@state': resolve(__dirname, './src/state'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
})
