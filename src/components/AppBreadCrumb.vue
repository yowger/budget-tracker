<template>
  <Breadcrumb v-bind:home="home" v-bind:model="items">
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" v-bind:to="item.route" custom>
        <a v-bind:href="href" v-bind="props.action" @click="navigate">
          <span v-if="item.icon" :class="[item.icon, 'text-color']"></span>
          <span
            :class="[
              item.active ? 'text-primary font-semibold' : 'text-surface-700 dark:text-surface-0',
            ]"
          >
            {{ item.label }}
          </span>
        </a>
      </router-link>
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
