<template>
  <div class="bg-white border-b border-gray-200 h-14 px-5 flex">
    <div class="w-full max-w-5xl mx-auto flex justify-between items-center">
      <Button label="Sign out" size="small" variant="text" @click="signOut" />

      <div class="flex items-center gap-2">
        <Avatar :image="avatarImage" :label="avatarLabel" class="w-8 h-8" shape="circle" />
        <span class="font-medium text-sm text-gray-800">
          {{ user.displayName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores/user'

const { signOut } = useAuth()
const { user } = useUserStore()

const avatarImage = computed(() => user.photoURL || undefined)
const avatarLabel = computed(() =>
  !user.photoURL && user.displayName ? user.displayName.charAt(0).toUpperCase() : undefined,
)
</script>
