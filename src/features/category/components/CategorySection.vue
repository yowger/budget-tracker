<template>
  <section>
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>

    <ul class="space-y-3">
      <category-list-item
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @delete="onDelete"
        @archive="onArchive"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import CategoryListItem from '@/features/category/components/CategoryListItem.vue'

const emit = defineEmits<{
  (e: 'delete', categoryId: string): void
  (e: 'archive', categoryId: string): void
}>()

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

function onDelete(categoryId: string) {
  emit('delete', categoryId)
}

function onArchive(categoryId: string) {
  emit('archive', categoryId)
}
</script>
