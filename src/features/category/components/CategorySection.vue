<template>
  <section>
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>

    <category-list-item-skeleton v-if="categoriesLoading" />
    <ul v-else>
      <category-list-item
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :is-deleting="category.isDeleting"
        :show-actions="showActions"
        :show-transactions="showTransactions"
        @delete="onDelete"
        @archive="onArchive"
      />
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

withDefaults(
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
    showActions?: boolean
    showTransactions?: boolean
    categoriesLoading?: boolean
  }>(),
  {
    showActions: true,
    showTransactions: true,
  },
)

function onDelete(categoryId: string) {
  emit('delete', categoryId)
}

function onArchive(categoryId: string) {
  emit('archive', categoryId)
}
</script>
