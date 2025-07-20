import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Requests to /api will be proxied to your backend server
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true, // Recommended for virtual-hosted sites
            },
        },
    },
});