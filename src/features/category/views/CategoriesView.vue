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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'

import { useCreateCategory, type CreateCategory } from '@/features/category/api/useCreateCategory'
import type { CategoryFormSubmitEvent } from '@/features/category/components/CategoryForm.vue'
import CategoryForm from '@/features/category/components/CategoryForm.vue'
import CategorySection from '@/features/category/components/CategorySection.vue'

import { useGetCategories } from '@/features/category/api/useGetCategories'

const toast = useToast()
const { data: categories } = useGetCategories()
const { mutate, isPending: categoryPending } = useCreateCategory()

const incomeCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'income'),
)

const expenseCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'expense'),
)

function handleSubmit(form: CategoryFormSubmitEvent) {
  if (!form.valid) {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields.',
      life: 3000,
    })
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
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category created successfully!',
        life: 3000,
      })
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create category.',
        life: 4000,
      })
    },
  })
}
</script>
