<template>
  <Card>
    <template #content>
      <div class="space-y-8">
        <category-section title="Income Categories" :categories="incomeCategories" />
        <category-section title="Expense Categories" :categories="expenseCategories" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const incomeCategories = [
  {
    name: 'Loan',
    value: 'loan',
    icon: 'pi pi-home',
    color: 'bg-green-500',
    transactions: 1,
  },
  {
    name: 'Salary',
    value: 'salary',
    icon: 'pi pi-wallet',
    color: 'bg-emerald-600',
    transactions: 4,
  },
  {
    name: 'Business',
    value: 'business',
    icon: 'pi pi-briefcase',
    color: 'bg-blue-500',
    transactions: 2,
  },
  {
    name: 'Gifts',
    value: 'gifts_income',
    icon: 'pi pi-gift',
    color: 'bg-pink-400',
    transactions: 0,
  },
]

const expenseCategories = [
  {
    name: 'Shopping',
    value: 'shopping',
    icon: 'pi pi-shopping-bag',
    color: 'bg-pink-500',
    transactions: 3,
  },
  {
    name: 'Food & Drink',
    value: 'food',
    icon: 'pi pi-apple',
    color: 'bg-yellow-500',
    transactions: 7,
  },
  {
    name: 'Transport',
    value: 'transport',
    icon: 'pi pi-car',
    color: 'bg-indigo-500',
    transactions: 2,
  },
  {
    name: 'Home',
    value: 'home',
    icon: 'pi pi-home',
    color: 'bg-orange-500',
    transactions: 1,
  },
  {
    name: 'Entertainment',
    value: 'entertainment',
    icon: 'pi pi-star',
    color: 'bg-purple-500',
    transactions: 0,
  },
]
</script>
