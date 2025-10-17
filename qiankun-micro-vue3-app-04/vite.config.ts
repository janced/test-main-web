import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  server:{
    port: 8081, // 和子应用中配置的port一致
    cors: true, // 允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有来源访问
    },
  },
  plugins: [
    vue(), 
    qiankun('vue3App', { // 和基座中配置的name一致
      useDevMode: true // 开启dev模式
    })
  ],
  // 生产环境打包配置
  build: {
    target: 'esnext',
    lib: {
      name: 'vue3App',
      entry: 'src/main.js',
      formats: ['umd'], // 必须是 umd 格式
      fileName: (_format) => `index.js`
    },
    rollupOptions: {
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
