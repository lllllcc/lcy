import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
const __dirname = dirname(fileURLToPath(import.meta.url))
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i
// https://vitejs.dev/config/
export default defineConfig(
  (
    { mode } //解构赋值，从对象中提取出mode属性，其中，mode是用于获取环境的，默认是开发环境
  ) => {
    const env = loadEnv(mode, process.cwd())
    //loadEnv可以加载环境变量，vite提供用于解决跨域问题的操作之一，需要传递两个参数 1哪个环境 2哪个文件(项目的根目录，vite提供了方法去获取)
    return {
      plugins: [vue()],
      resolve: {
        // 设置文件./src路径为 @
        alias: [
          {
            find: '@',
            replacement: resolve(__dirname, './src')
          }
        ]
      },
      //配置代理跨域
      server: {
        proxy: {
          [env.VITE_APP_BASE_API]: {
            target: env.VITE_SERVE, //拿数据的服务器地址
            changeOrigin: true, //是否代理跨域
            rewrite: (path) => path.replace(/^\/api/, '') //路径重写，把/api换成空串
          }
        }
      },
      base: '/lcy/',
      build: {
        rollupOptions: {
          output: {
            // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
            sanitizeFileName(name) {
              const match = DRIVE_LETTER_REGEX.exec(name)
              const driveLetter = match ? match[0] : ''
              // substr 是被淘汰語法，因此要改 slice
              return (
                driveLetter +
                name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
              )
            }
          }
        }
      }
    }
  }
)
