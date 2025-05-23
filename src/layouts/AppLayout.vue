<template>
  <div class="min-h-screen bg-surface-200 dark:bg-surface-900">
    <app-topbar></app-topbar>
    <app-sidebar
      v-bind:ref="'sidebar-ref'"
      v-bind:desktopClasses="menuDesktopClasses"
      v-bind:mobileClasses="menuMobileClasses"
    ></app-sidebar>

    <div
      v-bind:class="[
        'flex flex-col min-h-screen justify-between pt-20 px-6 pb-0 transition-all duration-300 ease-in-out',
        mainDesktopClasses,
      ]"
    >
      <div class="flex-1 pb-8">
        <div class="flex flex-col gap-4">
          <router-view></router-view>
        </div>
      </div>

      <app-footer></app-footer>
    </div>

    <div
      :class="[
        'md:hidden fixed top-0 left-0 w-full h-full z-[998]',
        'bg-gray-900/20 dark:bg-gray-900/60',
        layoutMaskClasses,
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

import AppFooter from '@/layouts/AppFooter.vue'
import AppSidebar from '@/layouts/AppSidebar.vue'
import AppTopbar from '@/layouts/AppTopbar.vue'
import useLayoutStore from '@/stores/layout'

const layout = useLayoutStore()

const sidebarRef = useTemplateRef<HTMLElement | null>('sidebar-ref')

function closeMenu() {
  layout.state.staticMenuMobileActive = false
}

onClickOutside(sidebarRef, () => {
  if (layout.state.staticMenuMobileActive) {
    closeMenu()
  }
})

const mainDesktopClasses = computed(() => {
  return layout.state.staticMenuDesktopInactive ? 'ml-0 pl-6' : 'md:ml-[18rem]'
})

const menuDesktopClasses = computed(() => {
  return layout.state.staticMenuDesktopInactive
    ? '-translate-x-full bg-green-200'
    : 'md:left-7 bg-red-200 -translate-x-full md:translate-x-0'
})

const menuMobileClasses = computed(() => {
  return layout.state.staticMenuMobileActive ? 'translate-x-0 left-0' : '-translate-x-full left-0'
})

const layoutMaskClasses = computed(() => {
  return layout.state.staticMenuMobileActive ? 'sm:block' : 'hidden'
})
</script>
