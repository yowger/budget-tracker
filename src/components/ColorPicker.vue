<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm mb-1">Color</label>
    <Button
      type="button"
      :label="modelValue || 'Select color'"
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
          class="relative w-4 h-4 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: modelValue }"
        >
          <div class="w-1 h-1 bg-white rounded-full"></div>
        </div>
        <i class="pi pi-chevron-down text-xs text-[#94a3b8]"></i>
      </template>
    </Button>

    <pop-over ref="popoverRef">
      <div class="grid grid-cols-3 gap-4 p-2">
        <div
          v-for="color in colors"
          :key="color.id"
          class="flex items-center justify-center cursor-pointer"
          @click="selectColor(color.value)"
        >
          <div
            class="relative w-8 h-8 rounded-full flex items-center justify-center"
            :style="{ backgroundColor: color.value }"
          >
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </pop-over>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  colors: { id: string; value: string }[]
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  name?: string
}>()

const emit = defineEmits(['update:modelValue'])

const popoverRef = ref()

function togglePopover(event: Event) {
  popoverRef.value?.toggle(event)
}

function selectColor(color: string) {
  emit('update:modelValue', color)
  popoverRef.value?.hide()
}
</script>
