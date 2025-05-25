import './styles/main.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { auth } from '@/includes/firebase'
import router from '@/router'
import useUserStore from '@/stores/user'
import themeConfig from '@/themes/themeConfig'

const pinia = createPinia()
let app: ReturnType<typeof createApp> | undefined

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)

    app.use(pinia)
    app.use(router)
    app.use(VueQueryPlugin)
    app.use(PrimeVue, themeConfig)

    const userStore = useUserStore()

    if (user) {
      userStore.setUser(user)
    } else {
      userStore.clearUser()
    }

    app.mount('#app')
  }
})
