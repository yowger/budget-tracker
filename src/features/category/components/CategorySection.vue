<template>
  <section>
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>

    <CategoryListItemSkeleton v-if="categoriesLoading" />
    <ul v-else>
      <li
        v-for="category in categories"
        :key="category.id"
        class="transition hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2"
      >
        <category-list-item
          :category="category"
          :is-deleting="category.isDeleting"
          @delete="onDelete"
          @archive="onArchive"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import CategoryListItem from '@/features/category/components/CategoryListItem.vue'
import CategoryListItemSkeleton from '@/features/category/components/CategoryListItemSkeleton.vue'

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
    isDeleting?: boolean
  }[]
  categoriesLoading?: boolean
}>()

function onDelete(categoryId: string) {
  emit('delete', categoryId)
}

function onArchive(categoryId: string) {
  emit('archive', categoryId)
}
</script>
