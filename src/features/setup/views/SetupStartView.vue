<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500">Checking setup progress...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { SETUP_STEPS } from '@/constants/setupSteps'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const { user } = useUserStore()

onMounted(() => {
  const step = user.setupStep

  if (step === SETUP_STEPS.GROUP) {
    router.replace({ name: 'setup-group' })
  } else if (step === SETUP_STEPS.CURRENCY) {
    router.replace({ name: 'setup-currency' })
  } else if (step === SETUP_STEPS.CATEGORIES) {
    router.replace({ name: 'setup-categories' })
  } else if (step === SETUP_STEPS.COMPLETE) {
    router.replace({ name: 'dashboard' })
  } else {
    router.replace({ name: 'setup-group' })
  }
})
</script>
