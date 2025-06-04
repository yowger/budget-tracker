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
      <div class="flex flex-col gap-1">
        <label for="icon" class="text-sm mb-1">Icon</label>
        <Button
          type="button"
          :label="selectedIcon ? selectedIcon : 'Select icon'"
          @click="toggleIcon"
          variant="outlined"
          severity="secondary"
          size="small"
          :class="[
            'flex items-center justify-between gap-2 h-full',
            $form.icon?.invalid ? 'border-red-500' : 'focus:border-[#94a3b8]',
          ]"
        >
          <div
            class="relative w-5 h-5 rounded-full flex items-center justify-center"
            :class="selectedColor"
          >
            <i :class="selectedIcon" class="text-xs text-white" v-if="selectedIcon"></i>
          </div>
          <i class="pi pi-chevron-down text-xs text-[#94a3b8]"></i>
        </Button>

        <Popover ref="iconPopover">
          <div class="grid grid-cols-4 gap-4 p-2">
            <div
              v-for="icon in iconOptions"
              :key="icon.value"
              class="flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100"
              @click="selectIcon(icon.value)"
            >
              <i :class="icon.value" class="text-xl"></i>
            </div>
          </div>
        </Popover>
      </div>

      <div class="flex flex-col gap-1">
        <label for="color" class="text-sm mb-1">Color</label>
        <Button
          type="button"
          :label="selectedColor ? selectedColor : 'Select color'"
          @click="toggleColor"
          variant="outlined"
          severity="secondary"
          size="small"
          :class="[
            'flex items-center justify-between gap-2 h-full',
            $form.color?.invalid ? 'border-red-500' : 'focus:border-[#94a3b8]',
          ]"
        >
          <div
            class="relative w-4 h-4 rounded-full flex items-center justify-center"
            :class="selectedColor"
          >
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <i class="pi pi-chevron-down text-xs text-[#94a3b8]"></i>
        </Button>

        <Popover ref="colorPopover">
          <div class="grid grid-cols-3 gap-4 p-2">
            <div
              v-for="color in colors"
              :key="color"
              class="flex items-center justify-center cursor-pointer"
              @click="selectColor(color)"
            >
              <div
                class="relative w-8 h-8 rounded-full flex items-center justify-center"
                :class="color"
              >
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Popover>
      </div>

      <div class="flex flex-col gap-1">
        <label for="name" class="text-sm mb-1">Name</label>
        <input-text id="name" name="name" placeholder="Write name" size="small" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="type.name" class="text-sm mb-1">Type</label>
        <Select
          name="type.name"
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
import { ref } from 'vue'
import { z } from 'zod'

const form = templateRef<FormInstance>('form')

const emit = defineEmits<{
  (e: 'submit', payload: FormSubmitEvent): void
}>()

const type = ref([
  { name: 'Expense', value: 'expense' },
  { name: 'Income', value: 'income' },
])

const initialValues = ref({
  name: '',
  type: { name: '' },
  icon: '',
  color: '',
})

const categorySchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.union([
    z.object({
      name: z.string().min(1, 'Type is required.'),
    }),
    z.any().refine(() => false, { message: 'Type is required.' }),
  ]),
})

const resolver = zodResolver(categorySchema)

const colors = ref([
  'bg-pink-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-emerald-600',
  'bg-red-500',
])

const selectedColor = ref(initialValues.value.color)
const colorPopover = ref()

const toggleColor = (event: Event) => colorPopover.value?.toggle(event)
const selectColor = (color: string) => {
  selectedColor.value = color
  form.value.setValues({ color })
  colorPopover.value?.hide()
}

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

const selectedIcon = ref<string | null>(initialValues.value.icon)
const iconPopover = ref()

const toggleIcon = (event: Event) => iconPopover.value?.toggle(event)
const selectIcon = (icon: string) => {
  selectedIcon.value = icon
  form.value.setValues({ icon })
  iconPopover.value?.hide()
}

function onSubmit(payload: FormSubmitEvent) {
  console.log('🚀 ~ onSubmit ~ payload:', payload)
}
</script>
