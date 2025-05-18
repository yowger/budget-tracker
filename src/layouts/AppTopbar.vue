<template>
  <div
    class="fixed top-0 left-0 h-14 w-full px-4 flex items-center justify-between text-color bg-surface-100 dark:bg-surface-900"
  >
    <div class="inline-flex gap-1 items-center">
      <Button v-on:click="layout.toggleMenu()" icon="pi pi-bars" variant="text"></Button>

      <router-link to="/">
        <span class="text-xl"> App </span>
      </router-link>
    </div>

    <div>
      <Button icon="pi pi-sun" variant="text" v-on:click="layout.toggleDarkMode()"></Button>
      <Button icon="pi pi-calendar" variant="text"></Button>
      <Button icon="pi pi-user" variant="text"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()
</script>
