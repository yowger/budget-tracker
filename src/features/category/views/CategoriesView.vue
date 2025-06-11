<template>
  <Card>
    <template #content>
      <div class="space-y-8">
        <category-form
          @submit="handleSubmit"
          :is-submitting="createCategoryPending"
        ></category-form>
        <category-section
          title="Income Categories"
          :categories="incomeCategories"
          @delete="handleCategoryDelete"
        />
        <category-section
          title="Expense Categories"
          :categories="expenseCategories"
          @delete="handleCategoryDelete"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'

import { useCreateCategory, type CreateCategory } from '@/features/category/api/useCreateCategory'
import { useGetCategories } from '@/features/category/api/useGetCategories'
import { useDeleteCategory } from '@/features/category/api/useDeleteCategory'
import type { CategoryFormSubmitEvent } from '@/features/category/components/CategoryForm.vue'
import CategoryForm from '@/features/category/components/CategoryForm.vue'
import CategorySection from '@/features/category/components/CategorySection.vue'
import useUserStore from '@/stores/user'

const toast = useToast()
const user = useUserStore().user
const { data: categories } = useGetCategories(user?.uid)
const { mutate: createCategory, isPending: createCategoryPending } = useCreateCategory(user?.uid)
const { mutate: deleteCategory, isPending: deleteCategoryPending } = useDeleteCategory(user?.uid)
const incomeCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'income'),
)

const expenseCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'expense'),
)

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

  createCategory(newCategory, {
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

function handleCategoryDelete(categoryId: string) {
  if (!user?.uid) {
    toast.add({
      severity: 'error',
      summary: 'Unauthorized',
      detail: 'You must be logged in to delete a category.',
      life: 4000,
    })
    return
  }

  deleteCategory(categoryId, {
    onSuccess: (success) => {
      if (success) {
        toast.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Category deleted successfully.',
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'info',
          summary: 'Cannot Delete',
          detail: 'This category has linked transactions.',
          life: 4000,
        })
      }
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete category.',
        life: 4000,
      })
    },
  })
}
</script>
