<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import useUserStore from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

userStore.$subscribe(
  (_mutation, state) => {
    const isLoggedOut = !state.user?.uid
    const routeRequiresAuth = router.currentRoute.value.meta.requiresAuth

    if (isLoggedOut && routeRequiresAuth) {
      router.push({ name: 'login' })
    }
  },
  {
    deep: true,
  },
)
</script>
