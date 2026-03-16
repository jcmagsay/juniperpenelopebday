import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.indexOf('node_modules') === -1) {
                        return;
                    }
                    if (id.indexOf('@mui') !== -1 || id.indexOf('@emotion') !== -1) {
                        return 'mui-vendor';
                    }
                    if (id.indexOf('react-router') !== -1) {
                        return 'router-vendor';
                    }
                    if (id.indexOf('lucide-react') !== -1) {
                        return 'icon-vendor';
                    }
                }
            }
        }
    }
});
