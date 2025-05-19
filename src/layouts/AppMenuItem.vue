<template>
  <li>
    <div>
      <router-link
        v-bind:to="item.to"
        v-if="item.to"
        class="px-2 py-1.5 flex items-center rounded hover:bg-gray-100 dark:hover:bg-surface-700"
        v-slot="{ isExactActive }"
      >
        <i
          v-bind:class="[isExactActive ? 'text-primary' : 'text-color', item.icon]"
          class="mr-2"
        ></i>
        <span v-bind:class="[isExactActive ? 'text-primary font-semibold' : 'text-color']">{{
          item.label
        }}</span>
      </router-link>

      <span
        v-else
        :class="[
          'text-sm uppercase font-medium text-color block',
          index === 0 ? 'mb-3' : 'my-[0.75rem]',
        ]"
        >{{ item.label }}</span
      >
    </div>

    <ul v-if="item.items && item.items.length">
      <app-menu-item v-for="(child, index) in item.items" :key="index" :item="child" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import AppMenuItem from '@/layouts/AppMenuItem.vue'

interface MenuItem {
  label: string
  items?: MenuItem[]
  icon?: string
  to?: string
}

const props = defineProps<{ index?: number; item: MenuItem }>()
</script>
