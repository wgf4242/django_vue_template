import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './utils/request'
import router from "./router";


createApp(App).use(router).use(createPinia()).mount('#app')

