import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: mode === 'production' ? '/wedding-card/' : '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            'KAKAO_API_KEY_PLACEHOLDER',
            env.VITE_KAKAO_JAVASCRIPT_KEY || ''
          );
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  };
});
