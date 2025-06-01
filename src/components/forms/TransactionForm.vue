<template>
  <Form :initialValues="initialValues" :resolver @submit="onSubmit">
    <div class="flex flex-col gap-4">
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

      <form-field name="category" v-slot="$field" class="flex flex-col gap-1">
        <label for="category" class="text-sm mb-1">Category</label>
        <Select
          v-model="selectedCategory"
          id="category"
          :options="filteredCategories"
          size="small"
          option-label="name"
          placeholder="Select category"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center gap-2">
              <i :class="slotProps.value.icon" class="text-sm text-gray-600"></i>
              <span>{{ slotProps.value.name }}</span>
            </div>
            <span v-else> {{ slotProps.placeholder }}</span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <i :class="slotProps.option.icon" class="text-sm text-gray-600"></i>
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
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
          >{{ $field.error?.message }}</Message
        >
      </form-field>

      <form-field name="date" v-slot="$field" class="flex flex-col gap-1">
        <label for="date" class="text-sm mb-1">Date</label>
        <date-picker id="date" showIcon fluid size="small" iconDisplay="input" showButtonBar />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
          >{{ $field.error?.message }}</Message
        >
      </form-field>

      <form-field name="note" v-slot="$field" class="flex flex-col gap-1">
        <label for="note" class="text-sm mb-1">Note (optional)</label>
        <input-text id="note" placeholder="Write note" size="small" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
          >{{ $field.error?.message }}</Message
        >
      </form-field>

      <form-field name="amount" v-slot="$field" class="flex flex-col gap-1">
        <label for="amount" class="text-sm mb-1">Amount</label>
        <input-text id="amount" type="number" placeholder="0.00" size="small" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="px-3"
          >{{ $field.error?.message }}</Message
        >
      </form-field>

      <div class="flex items-center gap-2">
        <Checkbox inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Keep open to add more transactions</label>
      </div>

      <Button type="submit" label="Save Transaction" class="mt-4 w-full" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref, reactive, computed } from 'vue'
import { z } from 'zod'

const allCategories = [
  { name: 'Food & Drink', value: 'food', type: 'expense', icon: 'pi pi-shop' },
  { name: 'Shopping', value: 'shopping', type: 'expense', icon: 'pi pi-shopping-bag' },
  { name: 'Transport', value: 'transport', type: 'expense', icon: 'pi pi-car' },
  { name: 'Home', value: 'home', type: 'expense', icon: 'pi pi-home' },
  { name: 'Entertainment', value: 'entertainment', type: 'expense', icon: 'pi pi-star' },
  { name: 'Groceries', value: 'groceries', type: 'expense', icon: 'pi pi-apple' },
  { name: 'Other (Expense)', value: 'other_expense', type: 'expense', icon: 'pi pi-ellipsis-h' },

  { name: 'Salary', value: 'salary', type: 'income', icon: 'pi pi-wallet' },
  { name: 'Business', value: 'business', type: 'income', icon: 'pi pi-briefcase' },
  { name: 'Gifts', value: 'gifts_income', type: 'income', icon: 'pi pi-gift' },
  { name: 'Extra Income', value: 'extra', type: 'income', icon: 'pi pi-plus' },
  { name: 'Loan', value: 'loan', type: 'income', icon: 'pi pi-credit-card' },
  { name: 'Other (Income)', value: 'other_income', type: 'income', icon: 'pi pi-ellipsis-h' },
]

const emit = defineEmits<{
  (e: 'submit', form: FormSubmitEvent): void
}>()

const categorySchema = z.union([
  z.string().min(1, 'Category is required'),
  z.object({
    name: z.string().min(1, 'Category is required'),
    value: z.string(),
    type: z.string(),
    icon: z.string(),
  }),
])

const transactionSchema = z.object({
  amount: z.coerce.number().gt(0, { message: 'Amount must be a positive number' }),
  category: categorySchema,
  date: z.date({ required_error: 'Date is required' }),
  note: z.string().optional(),
})

type TransactionFormData = z.infer<typeof transactionSchema>

const resolver = zodResolver(transactionSchema)

const initialValues = reactive<TransactionFormData>({
  amount: 0,
  category: '',
  date: new Date(),
  note: '',
})

const selectedCategory = ref(null)

const tabs = ['expense', 'income'] as const
const selectedType = ref<'income' | 'expense'>('expense')
function selectType(type: 'income' | 'expense') {
  selectedType.value = type
}

const filteredCategories = computed(() =>
  allCategories.filter((c) => c.type === selectedType.value),
)

function onSubmit(form: FormSubmitEvent) {
  console.log('🚀 ~ onSubmit ~ form:', form)
  emit('submit', form)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
