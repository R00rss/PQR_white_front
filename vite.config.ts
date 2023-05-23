import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:7000,
    proxy:{
      "/api": {
        // target: "http://172.19.10.55:8000",
        target: "http://200.7.214.122:9090",
        secure: false,
        changeOrigin: true,
      },
    }
  }
  
})
