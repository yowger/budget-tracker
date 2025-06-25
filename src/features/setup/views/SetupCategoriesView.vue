<template>
  <div class="p-6 max-w-3xl mx-auto space-y-8">
    <h1 class="text-2xl font-semibold">Choose Your Categories</h1>
    <p class="text-gray-600">Select from common income and expense categories to get started.</p>

    <category-section
      title="Income Categories"
      :categories="incomeCategories"
      :show-actions="false"
    />

    <category-section
      title="Expense Categories"
      :categories="expenseCategories"
      :show-actions="false"
    />

    <div class="text-right mt-6">
      <Button label="Finish Setup" @click="handleFinish"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategorySection from '@/features/category/components/CategorySection.vue'

const incomeCategories = [
  { id: 'salary', name: 'Salary', icon: 'briefcase', color: '#4CAF50', transactions: 0 },
  { id: 'gift', name: 'Gift', icon: 'gift', color: '#8BC34A', transactions: 0 },
]

const expenseCategories = [
  { id: 'food', name: 'Food', icon: 'utensils', color: '#F44336', transactions: 0 },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#FF9800', transactions: 0 },
]

function handleFinish() {}
</script>
