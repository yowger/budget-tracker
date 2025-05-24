<template>
  <div
    class="fixed top-0 left-0 h-14 w-full px-5 flex items-center justify-between text-color bg-white dark:bg-surface-800"
  >
    <div class="inline-flex gap-1 items-center">
      <Button v-on:click="layout.toggleMenu()" icon="pi pi-bars" variant="text"></Button>

      <router-link v-bind:to="{ name: 'dashboard' }">
        <span class="text-xl"> BudgetMate </span>
      </router-link>
    </div>

    <div>
      <Button icon="pi pi-sun" variant="text" v-on:click="layout.toggleDarkMode()"></Button>
      <Button icon="pi pi-calendar" variant="text"></Button>
      <Button icon="pi pi-user" variant="text"></Button>
      <Button v-on:click="handleSignOut()" icon="pi pi-sign-out" variant="text"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

import useLayoutStore from '@/stores/layout'
import useUserStore from '@/stores/user'

const router = useRouter()

const layout = useLayoutStore()
const userStore = useUserStore()

function handleSignOut() {
  userStore.signOut()
}
</script>
