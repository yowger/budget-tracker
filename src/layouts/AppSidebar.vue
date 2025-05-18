<template>
  <div
    v-bind:class="[
      'fixed w-64 bg-white h-screen md:h-[calc(100vh-8rem)] rounded-sm p-4 z-[999] top-0 md:top-24 transition-left duration-300 ease-in-out',
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
