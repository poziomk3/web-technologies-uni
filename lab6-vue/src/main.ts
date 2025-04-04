import './assets/main.css'
import naive from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { router } from './router'

const app = createApp(App)
app.use(naive)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)
app.mount('#app')
