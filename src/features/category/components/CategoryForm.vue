<template>
  <Form
    ref="form"
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onSubmit"
  >
    <input-text type="hidden" name="icon" :value="selectedIcon" />
    <input-text type="hidden" name="color" :value="selectedColor" />

    <div class="flex gap-4">
      <icon-picker
        v-model="selectedIcon"
        :icons="iconOptions"
        :color="selectedColor"
        :invalid="$form.icon?.invalid"
      ></icon-picker>

      <color-picker
        v-model="selectedColor"
        :colors="colors ?? []"
        :loading="colorsLoading"
        :disabled="colorsLoading"
        :invalid="$form.color?.invalid"
      ></color-picker>

      <div class="flex flex-col gap-1">
        <label for="name" class="text-sm mb-1">Name</label>
        <input-text id="name" name="name" placeholder="Write name" size="small" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="type" class="text-sm mb-1">Type</label>
        <Select
          name="type"
          :options="type"
          optionLabel="name"
          placeholder="Select a type"
          fluid
          size="small"
          class="flex items-center justify-between gap-2"
        ></Select>
      </div>

      <Button
        type="submit"
        severity="secondary"
        label="Create"
        class="w-auto self-end px-4"
        size="small"
      ></Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormInstance, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { templateRef } from '@vueuse/core'
import { ref, watch } from 'vue'
import { z } from 'zod'

import IconPicker from '@/features/category/components/IconPicker.vue'
import ColorPicker from '@/features/category/components/ColorPicker.vue'
import { useGetColors } from '@/features/category/api/useGetColors'

const categorySchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.union([
    z.object({
      name: z.string().min(1, 'Type is required 1.'),
      value: z.string().min(1, 'Type is required 1.'),
    }),
    z.any().refine(() => false, { message: 'Type is required 2.' }),
  ]),
})

export type CategoryFormSubmitEvent = FormSubmitEvent<z.infer<typeof categorySchema>>

const form = templateRef<FormInstance>('form')
const resolver = zodResolver(categorySchema)

const { data: colors, isLoading: colorsLoading } = useGetColors()

const emit = defineEmits<{
  (e: 'submit', payload: CategoryFormSubmitEvent): void
}>()

const initialValues = ref({
  name: '',
  type: { name: 'Expense', value: 'expense' },
  icon: '',
  color: '',
})

const selectedColor = ref(initialValues.value.color)
const selectedIcon = ref<string>(initialValues.value.icon)

const type = ref([
  { name: 'Expense', value: 'expense' },
  { name: 'Income', value: 'income' },
])

const iconOptions = [
  { label: 'Wallet', value: 'pi pi-wallet' },
  { label: 'Shopping Bag', value: 'pi pi-shopping-bag' },
  { label: 'Home', value: 'pi pi-home' },
  { label: 'Gift', value: 'pi pi-gift' },
  { label: 'Apple', value: 'pi pi-apple' },
  { label: 'Star', value: 'pi pi-star' },
  { label: 'Car', value: 'pi pi-car' },
  { label: 'Credit Card', value: 'pi pi-credit-card' },
  { label: 'Briefcase', value: 'pi pi-briefcase' },
  { label: 'Plus', value: 'pi pi-plus' },
  { label: 'Ellipsis', value: 'pi pi-ellipsis-h' },
]

watch(
  selectedColor,
  (newColor) => {
    if (form.value) {
      form.value.setValues({ color: newColor })
    }
  },
  { flush: 'post' },
)

watch(
  selectedIcon,
  (newIcon) => {
    if (form.value) {
      form.value.setValues({ icon: newIcon })
    }
  },
  { flush: 'post' },
)

function onSubmit(payload: FormSubmitEvent) {
  emit('submit', payload as CategoryFormSubmitEvent)
}
</script>
