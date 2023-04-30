import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import './style.css'
import App from './App.vue'

createApp(App).use(createPinia()).use(createVfm()).mount('#app')
