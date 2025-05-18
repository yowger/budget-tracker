<template>
  <div
    :class="[
      'fixed w-64 bg-white h-screen md:h-[calc(100vh-8rem)] rounded-sm p-4 z-[999] top-0 md:top-24 left-0 transition-all duration-300 ease-in-out',
      sidebarResponsiveClasses,
    ]"
  >
    <app-menu></app-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppMenu from '@/layouts/AppMenu.vue'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

const sidebarResponsiveClasses = computed(() => {
  return layout.state.overlayMenuActive ? 'translate-x-0 left-8' : '-translate-x-full left-0'
})
</script>
