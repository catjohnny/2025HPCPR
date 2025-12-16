
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果您的倉庫名稱是 my-repo，請將 '/' 改為 '/my-repo/'
  // 為了通用性，我們可以使用相對路徑 './'
  base: './',
  build: {
    outDir: 'dist',
  }
});
