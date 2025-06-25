<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-lg font-semibold mb-2">Preferred Currencies</h2>

    <div v-if="isLoading">Loading currencies...</div>
    <div v-else-if="isError">Failed to load currencies.</div>
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="currency in currencies"
        :key="currency.id"
        class="bg-white hover:bg-gray-50 p-2 rounded-md border border-gray-200 flex items-center cursor-pointer"
      >
        <Checkbox
          :inputId="currency.id"
          :value="currency"
          v-model="preferredCurrencies"
          size="small"
          class="mr-2"
        />

        <label :for="currency.id" class="cursor-pointer w-full">
          <span class="w-10 inline-block text-sm font-medium">{{ currency.currency }}</span>
          <span class="text-sm text-gray-500">{{ currency.name }}</span>
        </label>
      </div>
    </div>

    <div class="mt-4 text-right">
      <Button label="Next" @click="saveAndContinue" :disabled="preferredCurrencies.length === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetCurrency, type Currency } from '@/features/transactions/api/useGetCurrency'
import { ref } from 'vue'

const preferredCurrencies = ref<Currency[]>([])

const { data: currencies, isLoading, isError } = useGetCurrency()

function saveAndContinue() {
  console.log(preferredCurrencies.value)
}
</script>
