<template>
  <li
    class="flex justify-between items-center gap-3"
    :class="{ 'opacity-50 pointer-events-none': isDeleting }"
  >
    <div class="p-1">
      <CheckBox binary />
    </div>

    <div class="flex items-center gap-2 flex-1 overflow-hidden">
      <div class="flex-none">
        <i
          :class="[category.icon, 'rounded-full text-white p-2 text-sm']"
          :style="{ backgroundColor: category.color ? category.color : '#3B82F6' }"
        ></i>
      </div>

      <span class="font-medium basis-1/4 truncate">{{ category.name }} </span>
      <span class="text-sm text-gray-500 truncate basis-3/4">
        {{ category.transactions }} transaction
      </span>
    </div>

    <div v-if="showActions" class="flex gap-3">
      <Button icon="pi pi-cog" aria-label="edit" size="small"></Button>
      <Button
        icon="pi pi-eye"
        severity="secondary"
        aria-label="archive"
        size="small"
        @click="handleArchive"
      ></Button>
      <Button
        icon="pi pi-trash"
        severity="danger"
        aria-label="remove"
        size="small"
        @click="handleDelete"
      ></Button>
    </div>
  </li>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'archive', id: string): void
}>()

const props = withDefaults(
  defineProps<{
    category: {
      id: string
      name: string
      icon: string
      color: string
      transactions: number
    }
    showActions?: boolean
    isDeleting?: boolean
  }>(),
  {
    showActions: true,
  },
)

function handleDelete() {
  emit('delete', props.category.id)
}

function handleArchive() {
  emit('archive', props.category.id)
}
</script>
