import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';
// https://vite.dev/config/
export default defineConfig({
  //base用于设置打包之后的公共路径
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 规定触发警告的 chunk 大小。（以 kbs 为单位）
    chunkSizeWarningLimit: 4096,
    // rollup配置选项
    rollupOptions: {
      // 输出配置
      output: {
        // 手动分割代码块
        manualChunks(id) {
          // 如果id包含node_modules
          if (id.includes('node_modules')) {
            // 返回id字符串中node_modules后面的部分，以/分割，取第一个元素
            return id.toString().split('node_modules')[1].split('/')[0].toString();
          }
        },
        // 根据chunkInfo中的facadeModuleId生成文件名
        chunkFileNames: (chunkInfo) => {
          // 如果chunkInfo中有facadeModuleId，则将其以'/'分割成数组
          const facadeModuled = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          // 获取数组中倒数第二个元素，如果没有则返回'[name]'
          const fileName = facadeModuled[facadeModuled.length - 2] || '[name]';
          // 返回文件名，格式为'js/fileName/[name].[hash].js'
          return `js/${fileName}/[name].[hash].js`;
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
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
});
