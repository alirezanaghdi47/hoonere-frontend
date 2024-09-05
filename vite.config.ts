import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {VitePWA} from 'vite-plugin-pwa';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            // devOptions:{
            //     enabled: true,
            // },
            registerType: 'autoUpdate',
            // disable: process.env.NODE_ENV !== 'production',
            disable: true,
            // mode: "production",
            scope: "/",
            includeAssets: ["/public/assets/images/icons/favicon.ico"],
            manifest: {
                "name": "Hoonere",
                "short_name": "Hoonere",
                "description": "",
                "theme_color": "#50cd89",
                "background_color": "#F9F9F9",
                "display_override": ["fullscreen", "minimal-ui"],
                "display": "standalone",
                "orientation": "portrait",
                "scope": "/",
                "start_url": "/",
                "icons": [
                    {
                        "src": "./assets/images/icons/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "./assets/images/icons/icon-256x256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "./assets/images/icons/icon-384x384.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "./assets/images/icons/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "./assets/images/icons/maskable-icon.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ],
                "screenshots": []
            },
            injectRegister: 'inline',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                cleanupOutdatedCaches: true,
                // globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                globPatterns: ['**/*.{json,woff2,ico,png,svg}'],
            },
        })
    ],
    resolve: {
        alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
    },
    define: {
        'process.env': process.env
    },
});
