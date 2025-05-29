<template>
  <div
    class="fixed top-0 left-0 h-14 w-full px-5 flex items-center justify-between text-color bg-white dark:bg-surface-800"
  >
    <div class="inline-flex items-center gap-2">
      <Button v-on:click="layout.toggleMenu()" icon="pi pi-bars" variant="text"></Button>

      <router-link v-bind:to="{ name: 'dashboard' }" class="text-xl font-medium"> BM </router-link>
    </div>

    <div class="flex items-center gap-2">
      <Button v-on:click="layout.toggleDarkMode()" icon="pi pi-sun" variant="text" rounded></Button>
      <app-profile-dropdown
        name="Bonnie Green"
        avatar-url="https://picsum.photos/200/300"
        v-bind:menu-items="[
          { label: 'Profile', action: 'profile' },
          { type: 'divider' },
          { label: 'Sign out', action: 'signout' },
        ]"
        @select="handleDropdownSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import useLayoutStore from '@/stores/layout'
import useUserStore from '@/stores/user'

const layout = useLayoutStore()
const userStore = useUserStore()

function handleDropdownSelect(value: string) {
  console.log('🚀 ~ handleDropdownSelect ~ value:', value)
}

const profileMenuIsVisible = ref(false)
function toggleProfileMenu() {
  profileMenuIsVisible.value = !profileMenuIsVisible.value
}

const profileRef = useTemplateRef<HTMLElement | null>('profile-ref')
onClickOutside(profileRef, () => {
  profileMenuIsVisible.value = false
})

function handleSignOut() {
  userStore.signOut()
}
</script>
