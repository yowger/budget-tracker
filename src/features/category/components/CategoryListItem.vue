<template>
  <li
    class="transition hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 flex justify-between items-center gap-3"
    :class="{ 'opacity-50 pointer-events-none': isDeleting }"
  >
    <div class="p-1">
      <check-box binary :modelValue="checked" @change="$emit('check')" />
    </div>

    <div class="flex items-center gap-2 flex-1 overflow-hidden">
      <div class="flex-none">
        <i
          :class="[category.icon ? category.icon : 'pi pi-question']"
          class="rounded-full text-white p-2 text-sm"
          :style="{ backgroundColor: category.color ? category.color : '#3B82F6' }"
        ></i>
      </div>

      <span class="font-medium basis-1/4 truncate">{{ category.name }} </span>
      <span v-if="showTransactions" class="text-sm text-gray-500 truncate basis-3/4">
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
  (e: 'check'): void
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
      transactions?: number
    }
    checked?: boolean
    isDeleting?: boolean
    modelValue?: boolean
    showActions?: boolean
    showTransactions?: boolean
  }>(),
  {
    showActions: true,
    showTransactions: true,
    checked: false,
  },
)

function handleDelete() {
  emit('delete', props.category.id)
}

function handleArchive() {
  emit('archive', props.category.id)
}
</script>
