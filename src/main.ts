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
import { getUser } from '@/api/useGetUser'

let app: ReturnType<typeof createApp> | undefined

const pinia = createPinia()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

async function initUserState(user: typeof auth.currentUser) {
  const userStore = useUserStore()

  if (!user) {
    userStore.clearUser()
    return
  }

  try {
    const userProfile = await getUser(user.uid)
    if (userProfile) {
      userStore.setUser(userProfile)
    } else {
      userStore.clearUser()
    }
  } catch {
    userStore.clearUser()
  }
}

auth.onAuthStateChanged(async (user) => {
  if (!app) {
    app = createApp(App)

    app.use(pinia)
    await initUserState(user)

    app.use(router)
    app.use(VueQueryPlugin, { queryClient })
    app.use(PrimeVue, themeConfig)
    app.use(ConfirmationService)
    app.use(ToastService)

    app.mount('#app')
  }
})
