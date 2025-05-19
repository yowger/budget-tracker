<template>
  <div
    v-bind:class="[
      'fixed w-64 bg-white dark:bg-surface-800 h-screen md:h-[calc(100vh-6rem)] rounded p-4 z-[999] top-0 md:top-20 transition-left duration-300 ease-in-out',
      props.desktopClasses,
      props.mobileClasses,
    ]"
  >
    <app-menu></app-menu>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  desktopClasses: string
  mobileClasses: string
}>()

import AppMenu from '@/layouts/AppMenu.vue'
</script>
