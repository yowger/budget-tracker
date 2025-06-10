<template>
  <Form
    ref="form"
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onSubmit"
  >
    <input-text type="hidden" name="icon" :value="selectedIcon.label" />
    <input-text type="hidden" name="color" :value="selectedColor" />

    <div class="flex gap-4">
      <icon-picker
        v-model="selectedIcon"
        :icons="icons ?? []"
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
        :disabled="colorsLoading || isSubmitting"
        :loading="isSubmitting"
        type="submit"
        severity="secondary"
        label="Create"
        class="w-auto self-end px-4"
        size="small"
      ></Button>
    </div>

    <div v-if="colorsError" class="my-4">
      <Message size="small" severity="error">
        <div class="w-full flex items-center gap-3">
          <span> Failed to load colors. </span>

          <Button
            label="Retry"
            icon="pi pi-refresh"
            severity="danger"
            size="small"
            @click="refetchColors()"
          ></Button>
        </div>
      </Message>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormInstance, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { templateRef } from '@vueuse/core'
import { ref, watch } from 'vue'
import { z } from 'zod'

import { icons } from '@/constants/icons'
import IconPicker from '@/features/category/components/IconPicker.vue'
import ColorPicker from '@/features/category/components/ColorPicker.vue'
import { useGetColors } from '@/features/category/api/useGetColors'

const categorySchema = z.object({
  icon: z.union([
    z.any().refine(() => false, { message: 'Icon is required 2.' }),
    z.object({
      label: z.string().min(1, 'Icon label is required'),
      value: z.string().min(1, 'Icon value is required'),
    }),
  ]),
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

const {
  data: colors,
  isLoading: colorsLoading,
  isError: colorsError,
  refetch: refetchColors,
} = useGetColors()

defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: CategoryFormSubmitEvent): void
}>()

const initialValues = ref({
  name: '',
  type: { name: 'Expense', value: 'expense' },
  icon: { label: '', value: '' },
  color: '',
})

const selectedColor = ref<string>(initialValues.value.color)
const selectedIcon = ref<{ label: string; value: string }>(initialValues.value.icon)

const type = ref([
  { name: 'Expense', value: 'expense' },
  { name: 'Income', value: 'income' },
])

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
  {
    deep: true,
    flush: 'post',
  },
)

function onSubmit(form: FormSubmitEvent) {
  console.log('🚀 ~ onSubmit ~ payload:', form.errors)
  emit('submit', form as CategoryFormSubmitEvent)
}
</script>
