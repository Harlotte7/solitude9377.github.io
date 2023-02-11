import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import pinia from './stores'
import "normalize.css"
// 引入css样式
import "./assets/css/index.css"
createApp(App).use(router).use(pinia).mount('#app')
