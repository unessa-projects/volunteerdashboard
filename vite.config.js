// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://unessa-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['.loca.lt'], // ✅ Add this line
  },
});
