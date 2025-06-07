<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm mb-1">Icon</label>
    <Button
      type="button"
      :label="modelValue || 'Select icon'"
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
      <div
        class="relative w-5 h-5 rounded-full flex items-center justify-center"
        :style="{ backgroundColor: color }"
      >
        <i :class="modelValue" class="text-xs text-white" v-if="modelValue"></i>
      </div>
      <i class="pi pi-chevron-down text-xs text-[#94a3b8]"></i>
    </Button>

    <pop-over ref="popoverRef">
      <div class="grid grid-cols-4 gap-4 p-2">
        <div
          v-for="icon in icons"
          :key="icon.value"
          class="flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100"
          @click="selectIcon(icon.value)"
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
  modelValue: string
  icons: { label: string; value: string }[]
  color?: string
  disabled?: boolean
  invalid?: boolean
  name?: string
}>()

const emit = defineEmits(['update:modelValue'])

const popoverRef = ref()

function togglePopover(event: Event) {
  popoverRef.value?.toggle(event)
}

function selectIcon(icon: string) {
  emit('update:modelValue', icon)
  popoverRef.value?.hide()
}
</script>
