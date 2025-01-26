import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',  // Ensures the server is accessible on all network interfaces
    port: Number(process.env.PORT) || 3000,  // Binds to the port specified by the environment variable
    allowedHosts: ['company-incop.onrender.com'],  // Add the allowed host here
  }
});
