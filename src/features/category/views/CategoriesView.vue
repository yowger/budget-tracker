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
          :categories="
            incomeCategories.map((c) => ({
              ...c,
              isDeleting: isDeleting(c.id),
            }))
          "
          @delete="(categoryId) => handleConfirmDeleteCategory(categoryId)"
          :categories-loading="categoriesPending"
        />
        <category-section
          title="Expense Categories"
          :categories="
            expenseCategories.map((c) => ({
              ...c,
              isDeleting: isDeleting(c.id),
            }))
          "
          @delete="(categoryId) => handleConfirmDeleteCategory(categoryId)"
          :categories-loading="categoriesPending"
        />
      </div>
    </template>
  </Card>

  <confirm-dialog></confirm-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import { useCreateCategory, type CreateCategory } from '@/features/category/api/useCreateCategory'
import { useGetCategories } from '@/features/category/api/useGetCategories'
import { useDeleteCategory } from '@/features/category/api/useDeleteCategory'
import type { CategoryFormSubmitEvent } from '@/features/category/components/CategoryForm.vue'
import CategoryForm from '@/features/category/components/CategoryForm.vue'
import CategorySection from '@/features/category/components/CategorySection.vue'
import useUserStore from '@/stores/user'

const deletingCategoryIds = ref<Set<string>>(new Set())
const toast = useToast()
const confirm = useConfirm()
const user = useUserStore().user
const { data: categories, isPending: categoriesPending } = useGetCategories(user?.uid)
const { mutate: createCategory, isPending: createCategoryPending } = useCreateCategory(user?.uid)
const { mutate: deleteCategory, isPending: deleteCategoryPending } = useDeleteCategory(user?.uid)

const incomeCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'income'),
)
const expenseCategories = computed(() =>
  (categories.value ?? []).filter((category) => category.type === 'expense'),
)

function isDeleting(categoryId: string): boolean {
  return deletingCategoryIds.value.has(categoryId)
}

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

function handleConfirmDeleteCategory(categoryId: string) {
  confirm.require({
    message: 'Do you want to delete this category?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      deletingCategoryIds.value.add(categoryId)

      handleCategoryDelete(categoryId)
    },
  })
}

function handleCategoryDelete(categoryId: string) {
  const unauthorized = !user?.uid
  if (unauthorized) {
    toast.add({
      severity: 'error',
      summary: 'Unauthorized',
      detail: 'You must be logged in to delete a category.',
      life: 4000,
    })

    deletingCategoryIds.value.delete(categoryId)

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
    onSettled: () => {
      deletingCategoryIds.value.delete(categoryId)
    },
  })
}
</script>
