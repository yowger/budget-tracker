<template>
  <div class="relative flex items-center">
    <Avatar @click="toggleProfileMenu" shape="circle" v-bind="avatarProps" />

    <div class="absolute right-0 mt-2 z-50" v-bind:ref="'profile-ref'">
      <div
        v-bind:class="[
          'bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44',
          profileMenuIsVisible ? 'block' : 'hidden',
        ]"
      >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{{ name }}</div>
        </div>

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li v-for="(item, index) in menuItems" :key="index">
            <template v-if="item.type === 'divider'">
              <hr class="my-1 border-gray-100 dark:border-gray-600" />
            </template>
            <template v-else>
              <a
                href="#"
                @click.prevent="() => emit('select', item.action)"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {{ item.label }}
              </a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  name?: string
  avatarUrl?: string
  menuItems: ({ type: 'item'; label: string; action: string } | { type: 'divider' })[]
}>()

const emit = defineEmits<{
  (e: 'select', action: string): void
}>()

const profileMenuIsVisible = ref(false)
const profileRef = useTemplateRef<HTMLElement | undefined>('profile-ref')

function toggleProfileMenu() {
  profileMenuIsVisible.value = !profileMenuIsVisible.value
}

onClickOutside(profileRef, () => {
  profileMenuIsVisible.value = false
})

const avatarProps = computed(() => {
  if (props.avatarUrl) {
    return { image: props.avatarUrl }
  }

  if (props.name) {
    return {
      label: props.name.charAt(0).toUpperCase() || '?',
      style: 'background-color: #dee9fc; color: #1a2551',
    }
  }

  return {
    icon: 'pi pi-user',
    style: 'background-color: #dee9fc; color: #1a2551',
  }
})
</script>
