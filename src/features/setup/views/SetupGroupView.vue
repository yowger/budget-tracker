<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Create a Group</h1>
    <p class="mb-4 text-gray-600">Give your group a name to get started.</p>

    <div class="mb-4 flex flex-col gap-2">
      <input-text
        v-model="groupName"
        @input="touched = true"
        fluid
        placeholder="e.g. Family Budget"
      />

      <p v-if="touched && isEmpty" class="text-red-500">Group name can't be empty</p>
      <p v-if="touched && isInvalidGroupName" class="text-red-500">
        Name can't start with a number.
      </p>
    </div>

    <p v-if="!errorMessage" class="text-red-500 my-4">{{ errorMessage }}</p>

    <Button
      :disabled="isEmpty || isInvalidGroupName || isCreatingGroup"
      @click="handleCreateGroup"
      :isLoading="isCreatingGroup"
      >{{ isCreatingGroup ? 'Creating...' : 'Next' }}</Button
    >
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useCreateGroup } from '@/features/setup/api/useCreateGroup'
import { useUserStore } from '@/stores/user'

const groupName = ref('')
const errorMessage = ref('')
const touched = ref(false)

const { mutate: createGroup, isPending: isCreatingGroup } = useCreateGroup()
const router = useRouter()
const { user, setUser } = useUserStore()

const isEmpty = computed(() => {
  return !groupName.value
})

const isInvalidGroupName = computed(() => {
  return /^\d/.test(groupName.value)
})

async function handleCreateGroup() {
  errorMessage.value = ''

  if (!user.uid) {
    errorMessage.value = 'User not logged in.'

    return
  }

  createGroup(
    { groupName: groupName.value, ownerId: user.uid, members: [] },
    {
      onSuccess: (updatedUser) => {
        setUser({
          ...updatedUser,
        })

        router.push({ name: 'setup-currency' })
      },
      onError: () => {
        errorMessage.value = 'failed to create group'
      },
    },
  )
}
</script>
