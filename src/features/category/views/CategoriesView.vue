<template>
  <Card>
    <template #content>
      <div class="space-y-8">
        <category-form @submit="handleSubmit" :is-submitting="categoryPending"></category-form>
        <category-section title="Income Categories" :categories="incomeCategories" />
        <category-section title="Expense Categories" :categories="expenseCategories" />
      </div>
    </template>
  </Card>
  a
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCreateCategory, type CreateCategory } from '@/features/category/api/useCreateCategory'
import type { CategoryFormSubmitEvent } from '@/features/category/components/CategoryForm.vue'
import CategoryForm from '@/features/category/components/CategoryForm.vue'
import CategorySection from '@/features/category/components/CategorySection.vue'

import { useGetCategories } from '@/features/category/api/useGetCategories'

const { data: categories } = useGetCategories()

const incomeCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'income'),
)

const expenseCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'expense'),
)

const { mutate, isPending: categoryPending } = useCreateCategory()

function handleSubmit(form: CategoryFormSubmitEvent) {
  if (!form.valid) {
    return
  }

  const newCategory: CreateCategory = {
    name: form.values.name,
    icon: form.values.icon.label,
    color: form.values.color,
    type: form.values.type.value,
  }

  mutate(newCategory, {
    onSuccess: () => {
      console.log('Category created!')
    },
    onError: (error) => {
      console.log('🚀 ~ handleSubmit ~ error:', error)
    },
  })
}
</script>
