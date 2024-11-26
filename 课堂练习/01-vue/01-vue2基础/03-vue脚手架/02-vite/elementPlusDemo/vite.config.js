import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vite.dev/config/
export default defineConfig({
  build: {
    // 规定触发警告的 chunk 大小。（以 kbs 为单位）
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(),],
    }),
    Components({
      resolvers: [ElementPlusResolver(),],
    }),
  ],
});
