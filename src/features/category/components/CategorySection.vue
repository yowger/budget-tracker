<template>
  <section>
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>

    <ul class="space-y-3">
      <category-list-item v-for="category in categories" :key="category.id" :category="category" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import CategoryListItem from '@/features/category/components/CategoryListItem.vue'

defineProps<{
  title: string
  categories: {
    id: string
    name: string
    icon: string
    color: string
    transactions: number
  }[]
}>()
</script>
