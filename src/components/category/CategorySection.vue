<template>
  <section>
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>

    <ul class="space-y-3">
      <category-list-item
        v-for="category in categories"
        :key="category.value"
        :category="category"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  categories: {
    name: string
    value: string
    icon: string
  }[]
}>()
</script>
