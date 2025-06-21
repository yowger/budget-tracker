<template>
  <router-view></router-view>
  <toast />
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

userStore.$subscribe(
  (_mutation, state) => {
    const isAuthenticated = !!state.user?.uid
    const routeRequiresAuth = router.currentRoute.value.meta.requiresAuth

    if (!isAuthenticated && routeRequiresAuth) {
      router.push({ name: 'login' })
    }
  },
  {
    deep: true,
  },
)
</script>
