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
    <!-- <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
        <span class="font-bold whitespace-nowrap">Amy Elsner</span>
      </div>
    </template>
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-2">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
      <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus />
    </template> -->
    <transaction-form @submit="handleAddTransaction"></transaction-form>
  </Dialog>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import { ref } from 'vue'

import TransactionForm from '@/features/transactions/components/TransactionForm.vue'

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
