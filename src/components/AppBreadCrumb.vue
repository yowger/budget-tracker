<template>
  <Breadcrumb v-bind:home="home" v-bind:model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span v-if="item.icon" :class="[item.icon, 'text-zinc-500 dark:text-surface-400']"></span>

          <span class="font-medium text-zinc-500 dark:text-surface-400 cursor-pointer">
            {{ item.label }}
          </span>
        </a>
      </router-link>

      <span v-else class="font-medium text-zinc-500 dark:text-surface-400 cursor-default">
        <span v-if="item.icon" :class="[item.icon, 'text-zinc-500 dark:text-surface-400']"></span>
        {{ item.label }}
      </span>
    </template>
  </Breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const home = {
  icon: 'pi pi-home',
  route: '/',
}

const items = computed(() => {
  return route.meta.breadcrumb ?? []
})
</script>
