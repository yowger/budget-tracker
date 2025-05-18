<template>
  <div
    :class="[
      'fixed w-64 bg-white h-screen md:h-[calc(100vh-8rem)] rounded-sm p-4 z-[999] top-0 md:top-24 transition-left duration-300 ease-in-out',
      mainDesktopResponsiveClasses,
      // sidebarMobileResponsiveClasses,
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

const mainDesktopResponsiveClasses = computed(() => {
  return layout.state.staticMenuDesktopInactive
    ? 'md:-translate-x-full md:left-0 bg-green-200'
    : 'md:left-8 bg-red-200 -translate-x-full md:translate-x-0'
})

const sidebarMobileResponsiveClasses = computed(() => {
  return layout.state.staticMenuMobileActive ? 'translate-x-0 left-0' : '-translate-x-full left-0'
})
</script>
