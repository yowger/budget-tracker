<template>
  <div class="w-full flex">
    <template v-for="(label, index) in steps">
      <div class="flex-1">
        <div class="flex-1 h-2" :class="index === step ? 'bg-blue-500' : 'bg-gray-300'"></div>

        <div class="mt-2 flex items-center">
          <span class="text-xs text-gray-600 font-medium">
            {{ label }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const step = 1
const steps = ['Group', 'Currency', 'Icons', 'Complete']
</script>
