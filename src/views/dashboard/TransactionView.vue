<template>
  <div class="flex flex-col gap-4">
    <bread-crumb :home="home" :model="items" />

    <card>
      <template #title> Transactions </template>
      <template #content>
        <div>nice</div>
      </template>
    </card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const home = ref({
  icon: 'pi pi-home',
})
const items = ref([{ label: 'Budget' }, { label: 'Transactions' }])
</script>
