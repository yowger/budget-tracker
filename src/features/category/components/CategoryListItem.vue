<template>
  <li class="flex justify-between items-center gap-3">
    <div class="p-1">
      <CheckBox binary />
    </div>

    <div class="flex items-center gap-2 flex-1 overflow-hidden">
      <div class="flex-none">
        <i
          :class="[
            category.icon,
            category.color,
            'rounded-full bg-blue-500 text-white p-2 text-sm',
          ]"
        ></i>
      </div>

      <span class="font-medium basis-1/4 truncate">{{ category.name }}</span>
      <span class="text-sm text-gray-500 truncate basis-3/4">
        {{ category.transactions }} transaction
      </span>
    </div>

    <div class="flex gap-3">
      <Button icon="pi pi-cog" aria-label="edit" size="small"></Button>
      <Button icon="pi pi-eye" severity="secondary" aria-label="hide" size="small"></Button>
      <Button icon="pi pi-trash" severity="danger" aria-label="remove" size="small"></Button>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  category: {
    name: string
    value: string
    icon: string
    color: string
    transactions: number
  }
}>()
</script>
