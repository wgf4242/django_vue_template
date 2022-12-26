# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## Vitest
现在不推荐 VTU(vitest)这种测试。和浏览器环境有差异。

推荐 Cypress component test
### 1.ReferenceError: document is not defined

`pnpm i jsdom -D`

vite.config.ts中配置
```ts
/// <reference types="vitest" />

test {
  environment: 'jsdom'
}
```
example: src\components\Hello.spec.ts

### 2.jsx
pnpm i @vitejs/plugin-vue-jsx -D

vite.config.js中引入

```ts
import vueJsx from "@vitejs/plugin-vue-jsx"
...
plugin: [vueJsx(), vue()]
```

问题2 Cannot read properties of undefined (reading 'modules')

默认识别为ssr环境， 

解决方法：

vite.config.ts 的test中配置 [transformMode](https://vitest.dev/config/#transformmode)
```
test:{
  ...
  transformMode: {
    web: [/.tsx$/]
  }
}
```