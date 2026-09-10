import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import { routePaths } from './src/data/routePaths.js';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: process.env.VITE_SITE_URL || 'https://emmporiojuridico.com',
      dynamicRoutes: routePaths,
      exclude: ['/404'],
      // Los autos y sentencias nunca se indexan.
      robots: [{ userAgent: '*', allow: '/' }],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Las librerías pesadas se separan del código de la aplicación para
        // que un cambio de contenido no invalide su caché en el navegador.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('swiper')) return 'swiper';
          if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion';
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms';
          }
          return 'vendor';
        },
      },
    },
  },
});
