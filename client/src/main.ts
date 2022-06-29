import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './utils/request'
import router from "./router";
import './styles.css';


createApp(App).use(router).use(createPinia()).mount('#app')

