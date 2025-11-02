import { createApp } from 'vue'
// @ts-ignore
import { createPinia } from 'pinia'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import { inject } from '@vercel/analytics'

const app = createApp(App)
inject()
app.use(createPinia())
app.use(router)
app.mount('#app')
