import './styles/main.css'
import './styles/base.css'

import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: 'none',
})

app.mount('#app')
