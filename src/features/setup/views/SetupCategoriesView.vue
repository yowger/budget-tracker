<template>
  <div class="p-6 max-w-3xl mx-auto space-y-8">
    <h1 class="text-2xl font-semibold">Choose Your Categories</h1>
    <p class="text-gray-600">
      Select from common income and expense categories to get started. You can always add or edit
      more later.
    </p>

    <div>
      <h2 class="text-lg font-semibold mb-3">Income Categories</h2>
      <ul class="space-y-2">
        <category-list-item
          v-for="category in incomeCategories"
          :key="category.id"
          :category="category"
          :checked="selectedIncomeIds.has(category.id)"
          :showActions="false"
          :showTransactions="false"
          :disabled="isLoading"
          @check="() => toggleCategory(selectedIncomeIds, category.id)"
        />
      </ul>
    </div>

    <div>
      <h2 class="text-lg font-semibold mt-6 mb-3">Expense Categories</h2>
      <ul class="space-y-2">
        <category-list-item
          v-for="category in expenseCategories"
          :key="category.id"
          :category="category"
          :checked="selectedExpenseIds.has(category.id)"
          :showActions="false"
          :showTransactions="false"
          :disabled="isLoading"
          @check="() => toggleCategory(selectedExpenseIds, category.id)"
        />
      </ul>
    </div>

    <div class="text-right mt-6">
      <Button
        label="Finish Setup"
        @click="handleFinish"
        :disabled="isLoading"
        :loading="isLoading"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CategoryListItem from '@/features/category/components/CategoryListItem.vue'
import { useCreateCategories } from '@/features/category/api/useCreateCategories'
import { useUserStore } from '@/stores/user'
import { useUpdateUser } from '@/api/useUpdateUser'
import { SETUP_STEPS } from '@/constants/setupSteps'
import type { CreateCategoriesInput } from '@/features/category/api/useCreateCategories'

const incomeCategories = [
  { id: 'salary', name: 'Salary', icon: 'pi pi-briefcase', color: '#4CAF50' },
  { id: 'freelance', name: 'Freelance', icon: 'pi pi-wallet', color: '#66BB6A' },
  { id: 'gift', name: 'Gift', icon: 'pi pi-gift', color: '#81C784' },
  { id: 'investment', name: 'Investment', icon: 'pi pi-chart-line', color: '#388E3C' },
  { id: 'refund', name: 'Refund', icon: 'pi pi-undo', color: '#43A047' },
]

const expenseCategories = [
  { id: 'food', name: 'Food & Dining', icon: 'pi pi-shop', color: '#EF5350' },
  { id: 'transport', name: 'Transport', icon: 'pi pi-car', color: '#FF9800' },
  { id: 'rent', name: 'Rent', icon: 'pi pi-home', color: '#E91E63' },
  { id: 'utilities', name: 'Utilities', icon: 'pi pi-bolt', color: '#9C27B0' },
  { id: 'entertainment', name: 'Entertainment', icon: 'pi pi-play', color: '#03A9F4' },
  { id: 'shopping', name: 'Shopping', icon: 'pi pi-shopping-bag', color: '#FF7043' },
  { id: 'health', name: 'Health', icon: 'pi pi-heart', color: '#E53935' },
  { id: 'travel', name: 'Travel', icon: 'pi pi-globe', color: '#00ACC1' },
]

const selectedIncomeIds = ref(new Set(incomeCategories.map((c) => c.id)))
const selectedExpenseIds = ref(new Set(expenseCategories.map((c) => c.id)))

const isLoading = ref(false)

const router = useRouter()
const { user, setUser } = useUserStore()
const { mutateAsync: createCategories } = useCreateCategories()
const { mutateAsync: updateUser } = useUpdateUser()

function toggleCategory(set: Set<string>, id: string) {
  set.has(id) ? set.delete(id) : set.add(id)
}

async function handleFinish() {
  if (!user.uid || !user.defaultGroupId) {
    console.warn('Missing user or group.')
    return
  }

  isLoading.value = true

  const selectedCategories: CreateCategoriesInput[] = [
    ...incomeCategories
      .filter((c) => selectedIncomeIds.value.has(c.id))
      .map((c) => ({
        groupId: user.defaultGroupId!,
        name: c.name,
        icon: c.icon,
        color: c.color,
        type: 'income' as const,
      })),
    ...expenseCategories
      .filter((c) => selectedExpenseIds.value.has(c.id))
      .map((c) => ({
        groupId: user.defaultGroupId!,
        name: c.name,
        icon: c.icon,
        color: c.color,
        type: 'expense' as const,
      })),
  ]

  try {
    await createCategories(selectedCategories)

    const updatedUser = await updateUser({
      uid: user.uid,
      data: { setupStep: SETUP_STEPS.COMPLETE },
    })

    setUser({ ...updatedUser })
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Error creating categories:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
