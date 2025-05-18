<template>
  <div class="min-h-screen">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>

    <div
      :class="[
        'flex flex-col min-h-screen justify-between pt-24 px-8 pb-0 transition-all duration-300 ease-in-out',
        mainResponsiveClasses,
      ]"
    >
      <div class="flex-1 pb-8">
        <router-view></router-view>
      </div>

      <app-footer></app-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppFooter from '@/layouts/AppFooter.vue'
import AppSidebar from '@/layouts/AppSidebar.vue'
import AppTopbar from '@/layouts/AppTopbar.vue'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

const mainResponsiveClasses = computed(() => {
  return layout.state.overlayMenuActive ? 'ml-[18rem]' : 'ml-0 pl-4'
})
</script>
