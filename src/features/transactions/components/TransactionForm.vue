<template>
  <Form ref="form" v-slot="$form" :initialValues="initialValues" :resolver @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <input-text type="hidden" name="type" :value="selectedType" />

      <div class="flex gap-2">
        <Button
          v-for="tab in tabs"
          :key="tab"
          :label="capitalize(tab)"
          :outlined="selectedType !== tab"
          :severity="selectedType === tab ? 'primary' : undefined"
          @click="() => selectType(tab)"
          size="small"
        ></Button>
      </div>

      <div class="flex flex-col gap-1">
        <label for="category" class="text-sm mb-1">Category</label>
        <Select
          id="category"
          name="category"
          :options="filteredCategories"
          size="small"
          option-label="name"
          placeholder="Select category"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center gap-2">
              <div
                class="relative w-5 h-5 rounded-sm flex items-center justify-center"
                :style="{
                  backgroundColor: slotProps.value.color ? slotProps.value.color : '#E5E7EB',
                }"
              >
                <i :class="slotProps.value.icon" class="text-xs text-white"></i>
              </div>
              <span>{{ slotProps.value.name }}</span>
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <div
                class="relative w-5 h-5 rounded-sm flex items-center justify-center"
                :style="{
                  backgroundColor: slotProps.option.color ? slotProps.option.color : '#E5E7EB',
                }"
              >
                <i :class="slotProps.option.icon" class="text-xs text-white"></i>
              </div>
              <span>{{ slotProps.option.name }}</span>
            </div>
          </template>

          <template #footer>
            <div class="p-3">
              <Button
                label="Edit categories"
                fluid
                severity="secondary"
                text
                size="small"
                icon="pi pi-pencil"
              ></Button>
            </div>
          </template>
        </Select>

        <Message
          v-if="$form.category?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
        >
          {{ $form.category.error?.message }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <label for="date" class="text-sm mb-1">Date</label>
        <date-picker
          id="date"
          name="date"
          showIcon
          fluid
          size="small"
          iconDisplay="input"
          showButtonBar
        />
        <Message
          v-if="$form.date?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
        >
          {{ $form.date.error?.message }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <label for="note" class="text-sm mb-1">Note (optional)</label>
        <input-text id="note" name="note" placeholder="Write note" size="small" />
        <Message
          v-if="$form.note?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
        >
          {{ $form.note.error?.message }}
        </Message>
      </div>

      <div class="flex gap-3">
        <div class="flex-1 flex flex-col gap-1">
          <label for="amount" class="text-sm mb-1">Amount</label>
          <input-text
            id="amount"
            name="amount"
            type="number"
            placeholder="0.00"
            size="small"
            class="w-full font-semibold"
            :class="selectedType === 'income' ? 'text-green-500' : 'text-red-500'"
          />
          <Message
            v-if="$form.amount?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="px-3"
          >
            {{ $form.amount.error?.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1 w-[120px]">
          <label for="currency" class="text-sm mb-1">Currency</label>
          <Select
            id="currency"
            name="currency"
            :options="currencies"
            optionLabel="name"
            placeholder="Select currency"
            size="small"
            class="w-full"
            fluid
          >
            <template #value="slotProps">
              <span v-if="slotProps.value"> {{ slotProps.value.currency }} </span>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>

            <template #option="slotProps">
              <div class="flex gap-2 items-center">
                <span class="text-gray-500 w-12">{{ slotProps.option.currency }}</span>
                <span class="whitespace-nowrap">{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Select>
          <Message
            v-if="$form.currency?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="px-3"
          >
            {{ $form.currency.error?.message }}
          </Message>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Checkbox inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Keep open to add more transactions</label>
      </div>

      <Button type="submit" label="Save Transaction" class="mt-4 w-full"></Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { templateRef } from '@vueuse/core'
import { z } from 'zod'
import { type FormInstance, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'

import type { Category } from '@/features/category/api/useGetCategories'
import type { Currency } from '@/features/transactions/api/useGetCurrency'

const form = templateRef<FormInstance>('form')

const tabs = ['expense', 'income'] as const
const selectedType = ref<'income' | 'expense'>('expense')

const props = defineProps<{
  categories: Category[]
  categoriesLoading: boolean
  currencies: Currency[]
  currenciesLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', form: FormSubmitEvent): void
}>()

const categorySchema = z.union([
  z.string().min(1, 'Category is required'),
  z.object({
    id: z.string(),
    name: z.string().min(1, 'Category is required'),
    type: z.string(),
    icon: z.string(),
  }),
])

const transactionSchema = z.object({
  amount: z.coerce.number().gt(0, { message: 'Amount must be a positive number' }),
  type: z.enum(['income', 'expense']),
  currency: z.object({
    id: z.string(),
    currency: z.string(),
    name: z.string(),
  }),
  category: categorySchema,
  date: z.date({ required_error: 'Date is required' }),
  note: z.string().optional(),
})

type TransactionFormData = z.infer<typeof transactionSchema>
const resolver = zodResolver(transactionSchema)

const initialValues = reactive<TransactionFormData>({
  amount: 0,
  type: 'expense',
  currency: {
    id: '',
    currency: '',
    name: '',
  },
  category: '',
  date: new Date(),
  note: '',
})

watch(
  () => props.currencies,
  (currencies) => {
    if (currencies.length) {
      const usd = currencies.find((c) => c.currency === 'USD')
      if (usd) {
        initialValues.currency = usd
      }
    }
  },
  { immediate: true },
)

const filteredCategories = computed(() => {
  return props.categories.filter((c) => c.type === selectedType.value)
})

function resetCategory() {
  form.value.setFieldValue('category', undefined)
}

function selectType(type: 'income' | 'expense') {
  selectedType.value = type

  form.value.setFieldValue('type', type)

  resetCategory()
}

function onSubmit(form: FormSubmitEvent) {
  emit('submit', form)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
