import './styles/main.css'

import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { auth } from '@/includes/firebase'
import router from '@/router'
import MyPreset from '@/themes/myPreset'

let app: ReturnType<typeof createApp> | undefined

auth.onAuthStateChanged(() => {
  if (!app) {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)

    app.use(PrimeVue, {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
    })

    app.mount('#app')
  }
})
