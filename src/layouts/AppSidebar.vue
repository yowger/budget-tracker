<template>
  <div
    v-bind:class="[
      'fixed w-64 bg-surface-100 dark:bg-surface-900 h-screen md:h-[calc(100vh-8rem)] rounded p-4 z-[999] top-0 md:top-20 transition-left duration-300 ease-in-out',
      props.desktopClasses,
      props.mobileClasses,
    ]"
  >
    <p>app menu</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  desktopClasses: string
  mobileClasses: string
}>()
</script>
