<template>
  <ul class="list-none p-0 m-0 flex items-center font-medium mb-3">
    <li>
      <router-link
        v-bind:to="home.route"
        class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer"
      >
        Dashboard
      </router-link>
    </li>

    <template v-for="(item, index) in items" v-bind:key="index">
      <li class="px-2">
        <i
          class="pi pi-angle-right text-surface-500 dark:text-surface-300 !text-sm !leading-normal"
        ></i>
      </li>

      <li>
        <router-link
          v-if="item.route"
          v-bind:to="item.route"
          v-bind:class="['cursor-pointer', crumbClass(index)]"
        >
          <i v-if="item.icon" :class="item.icon" class="mr-2"></i>
          {{ item.label }}
        </router-link>

        <span v-else v-bind:class="crumbClass(index)">
          <i v-if="item.icon" v-bind:class="item.icon" class="mr-2"></i>
          {{ item.label }}
        </span>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
  label: string
  icon?: string
  route?: string
}

const route = useRoute()

const home = {
  icon: 'pi pi-home',
  route: '/',
}

const items = computed<BreadcrumbItem[]>(() => {
  return (route.meta.breadcrumb as BreadcrumbItem[]) ?? []
})

function isLast(index: number) {
  return index === items.value.length - 1
}

const crumbClass = (index: number) => {
  return isLast(index)
    ? 'text-surface-900 dark:text-surface-0 leading-normal'
    : 'text-surface-500 dark:text-surface-300 no-underline leading-normal'
}
</script>
