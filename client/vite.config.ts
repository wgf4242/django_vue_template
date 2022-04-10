import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from "path";
// import { fileURLToPath, URL } from "url";

// import Components from "unplugin-vue-components/vite"
// import AutoImport from 'unplugin-auto-import/vite'
// import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
// import externalGlobals from 'rollup-plugin-external-globals'
// import {terser} from 'rollup-plugin-terser';

export default defineConfig({
    server: {
        proxy: {
            '/static': 'http://127.0.0.1:8000/',
            '/api': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
            // "@": fileURLToPath(new URL("./src", import.meta.url)),
        }
    },
    plugins: [vue()],
    // plugins: getPlugins(),
    // build: build()
})

function getPlugins() {
    return [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver()]
            // dirs: ["src/components"], // 要导入组件的目录的相对路径
            //   deep: true, // 搜索子目录
            //   dts: "src/components/components.d.ts", // 生成 `components.d.ts` 全局声明
        }),
        AutoImport({
            imports: ["vue"], // 自动导入vue和vue-router相关函数
            // imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
            resolvers: [AntDesignVueResolver()],
            dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
        }),
    ]
}

function build() {
    return {
        rollupOptions: {
            external: ['vue', 'exceljs', 'ant-design-vue'],
            plugins: [
                externalGlobals({
                    vue: 'Vue',
                    'exceljs': 'ExcelJS',
                    "ant-design-vue": "antd",
                }),
                terser({
                    compress: {
                        defaults: true,
                        drop_console: false
                    },
                    mangle: {
                        eval: true,
                        module: true,
                        toplevel: true,
                        safari10: true,
                        properties: false
                    },
                    output: {
                        comments: false,
                        // ecma: '2020'
                        ecma: 2020
                    }
                })
            ],
        }
    }
};
