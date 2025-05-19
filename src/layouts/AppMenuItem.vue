<template>
  <li>
    <div>
      <i :class="item.icon"></i>
      <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
      <span v-else class="text-sm uppercase font-medium text-color my-[0.75rem] block">{{
        item.label
      }}</span>
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

const props = defineProps<{ item: MenuItem }>()
</script>
