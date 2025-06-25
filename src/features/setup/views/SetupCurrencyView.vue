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
          :value="currency.id"
          v-model="preferredCurrencyCodes"
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
      <Button
        label="Next"
        @click="saveCurrencyAndContinue"
        :disabled="preferredCurrencyCodes.length === 0 || isPending"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGetCurrency } from '@/features/transactions/api/useGetCurrency'
import { useUpdateGroup } from '@/features/setup/api/useUpdateGroup'
import { useUserStore } from '@/stores/user'

const { data: currencies, isLoading, isError } = useGetCurrency()
const preferredCurrencyCodes = ref<string[]>([])

const router = useRouter()
const userStore = useUserStore()
const { mutate: updateGroup, isPending } = useUpdateGroup()

function saveCurrencyAndContinue() {
  const groupId = userStore.user.defaultGroupId

  if (!groupId) {
    return
  }

  updateGroup(
    {
      groupId,
      data: {
        preferredCurrencies: preferredCurrencyCodes.value,
      },
    },
    {
      onSuccess: () => {
        router.push('/setup/icons')
      },
    },
  )
}
</script>
