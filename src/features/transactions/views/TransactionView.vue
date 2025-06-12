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
import { useGetCategories } from '@/features/category/api/useGetCategories'
import { useGetCurrency } from '@/features/transactions/api/useGetCurrency'
import useUserStore from '@/stores/user'

const user = useUserStore().user
const { data: categories, isPending: categoriesPending } = useGetCategories(user?.uid)
const { data: currencies, isLoading: currenciesLoading } = useGetCurrency()

let showTransactDialog = ref(false)
function showAddTransaction() {
  showTransactDialog.value = true
}

function handleCloseTransactDialog() {
  showTransactDialog.value = false
}

function handleAddTransaction(form: FormSubmitEvent) {
  if (form.valid) {
    console.log('save transaction')
  }
}
</script>
