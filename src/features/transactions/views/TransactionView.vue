<template>
  <div>
    <Button
      v-on:click="showAddTransaction"
      label="Add Transaction"
      icon="pi pi-plus"
      size="small"
    ></Button>
  </div>
  <card>
    <template #title> Transactions </template>
    <template #content>
      <div>filter</div>

      <div>nice</div>
    </template>
  </card>

  <Dialog
    v-model:visible="showTransactDialog"
    modal
    header="Add transaction"
    v-bind:closable="true"
    @hide="handleCloseTransactDialog"
    class="w-11/12 md:w-1/2"
  >
    <TransactionForm
      :categories="categories ?? []"
      :categories-loading="categoriesPending"
      :currencies="currencies ?? []"
      :currencies-loading="currenciesLoading"
      @submit="handleAddTransaction"
    />
  </Dialog>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import { ref } from 'vue'

import TransactionForm from '@/features/transactions/components/TransactionForm.vue'
import { useCreateTransaction } from '@/features/transactions/api/useCreateTransactions'
import { useGetCategories } from '@/features/category/api/useGetCategories'
import { useGetCurrency } from '@/features/transactions/api/useGetCurrency'
import useUserStore from '@/stores/user'

const user = useUserStore().user
const { data: categories, isPending: categoriesPending } = useGetCategories(user?.uid)
const { data: currencies, isLoading: currenciesLoading } = useGetCurrency()
const { mutate: createTransaction } = useCreateTransaction()

let showTransactDialog = ref(false)
function showAddTransaction() {
  showTransactDialog.value = true
}

function handleCloseTransactDialog() {
  showTransactDialog.value = false
}

function handleAddTransaction(form: FormSubmitEvent) {
  console.log('🚀 ~ handleAddTransaction ~ form:', form)
  if (!user?.uid) {
    return
  }

  if (!form.valid) {
    return
  }

  // createTransaction({
  //   userId: user?.uid,
  //   amount: form.values.amount,

  // })

  /*
    amount: number
    currency: string
    categoryId: string
    date: Date
    note?: string
    type: 'income' | 'expense'
    userId: string
  */
}
</script>
