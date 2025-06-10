<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm mb-1">Icon</label>
    <Button
      type="button"
      :label="modelValue.value || 'Select icon'"
      @click="togglePopover"
      variant="outlined"
      severity="secondary"
      size="small"
      :disabled="disabled"
      :class="[
        'flex items-center justify-between gap-2 h-full',
        invalid ? 'border-red-500' : 'focus:border-[#94a3b8]',
      ]"
    >
      <i v-if="loading" class="pi pi-spinner animate-spin"></i>
      <template v-else>
        <div
          class="relative w-5 h-5 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: color ? color : '#E5E7EB' }"
        >
          <i :class="modelValue.value" class="text-xs text-white" v-if="modelValue"></i>
        </div>
        <i class="pi pi-chevron-down text-xs text-[#94a3b8]"></i>
      </template>
    </Button>

    <pop-over ref="popoverRef">
      <div class="grid grid-cols-4 gap-4 p-2">
        <div
          v-for="icon in icons"
          :key="icon.value"
          class="flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100"
          @click="selectIcon(icon)"
        >
          <i :class="icon.value" class="text-xl"></i>
        </div>
      </div>
    </pop-over>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: { label: string; value: string }
  icons: { label: string; value: string }[]
  color?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  name?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { label: string; value: string }): void
}>()

const popoverRef = ref()

function togglePopover(event: Event) {
  popoverRef.value?.toggle(event)
}

function selectIcon(icon: { label: string; value: string }) {
  emit('update:modelValue', icon)

  popoverRef.value?.hide()
}
</script>
