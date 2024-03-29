/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
// import { fileURLToPath, URL } from "url";

// import Components from "unplugin-vue-components/vite"
// import AutoImport from 'unplugin-auto-import/vite'
// import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
// import externalGlobals from 'rollup-plugin-external-globals'
// import {terser} from 'rollup-plugin-terser';
// @ts-ignore
import { vitestConfig } from "./vitestConfig.ts"
import VueDevTools from 'vite-plugin-vue-devtools'
// 上一行 如果报错 在tsconfig.node.json中includes配置

// import postCssPxToRem from 'postcss-pxtorem' // pnpm i postcss-pxtorem -D


export default defineConfig({
  test: {
    ...vitestConfig,
  },
  server: {
    proxy: {
      '/media': 'http://127.0.0.1:8000',
      "/static": "http://127.0.0.1:8000",
      '/api': 'http://127.0.0.1:8000',
      // "/api": {
      //   target: "http://127.0.0.1:8000/",
      //   changeOrigin: true,
      // },
      // "/api": { // mockData, 访问的实际是 public/mock // axios.get('/api/data.json').then(res => console.log(res.data))
      //     target: "http://localhost:5174/",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '/mock'),
      // },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [vueJsx(), vue(), VueDevTools()],
  // plugins: getPlugins(),
  // build: build()

  // css: {
  //     postcss:{
  //         plugins:[
  //             postCssPxToRem({
  //                 rootValue:120,
  //                 propList:['*'],
  //             })
  //         ]
  //     }
  // }
})

// function getPlugins() {
//   return [
//     vue(),
//     Components({
//       resolvers: [AntDesignVueResolver()],
//       // resolvers: [VantResolver()] // 注意：VantResolver会把css打包进去
//       // dirs: ["src/components"], // 要导入组件的目录的相对路径
//       //   deep: true, // 搜索子目录
//       //   dts: "src/components/components.d.ts", // 生成 `components.d.ts` 全局声明
//     }),
//     AutoImport({
//       imports: ["vue"], // 自动导入vue和vue-router相关函数
//       // imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
//       resolvers: [AntDesignVueResolver()],
//       dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
//     }),
//   ]
// }
//
// function build() {
//   return {
//     rollupOptions: {
//       external: ["vue", "exceljs", "ant-design-vue"],
//       plugins: [
//         externalGlobals({
//           vue: "Vue",
//           // 'vant': 'vant',
//           exceljs: "ExcelJS",
//           "ant-design-vue": "antd",
//         }),
//         terser({
//           compress: {
//             defaults: true,
//             drop_console: false,
//           },
//           mangle: {
//             eval: true,
//             module: true,
//             toplevel: true,
//             safari10: true,
//             properties: false,
//           },
//           output: {
//             comments: false,
//             // ecma: '2020'
//             ecma: 2020,
//           },
//         }),
//       ],
//     },
//   }
// }
