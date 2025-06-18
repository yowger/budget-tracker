import './styles/main.css'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { auth } from '@/includes/firebase'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import themeConfig from '@/themes/themeConfig'

const pinia = createPinia()
let app: ReturnType<typeof createApp> | undefined

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)

    app.use(pinia)
    app.use(router)
    app.use(VueQueryPlugin, {
      queryClient,
    })
    app.use(PrimeVue, themeConfig)
    app.use(ConfirmationService)
    app.use(ToastService)

    const userStore = useUserStore()

    if (user) {
      userStore.setUser(user)
    } else {
      userStore.clearUser()
    }

    app.mount('#app')
  }
})
