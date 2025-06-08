<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl max-w-xl mx-auto"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-medium leading-tight">
          Welcome <br />
          To BudgetMate
        </h1>
      </div>

      <login-form
        v-model:loading="loading"
        v-model:authError="authErrorMessage"
        @submit="handleSubmit"
        @googleLogin="handleGoogleLogin"
      />

      <div class="text-center mt-6">
        <span class="text-surface-700 dark:text-surface-200">Not registered?</span>
        <router-link
          v-bind:to="{ name: 'register' }"
          class="text-primary font-medium ml-1 hover:text-primary-emphasis"
        >
          Create an Account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormSubmitEvent } from '@primevue/forms'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useUserStore from '@/stores/user'
import LoginForm from '@/features/auth/components/LoginForm.vue'
import { FirebaseError } from 'firebase/app'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const authErrorMessage = ref<string | null>(null)

async function handleSubmit(form: FormSubmitEvent) {
  if (!form.valid) return

  loading.value = true
  authErrorMessage.value = null
  const { email, password } = form.values

  try {
    await userStore.emailLogin(email, password)

    handleRedirect()
  } catch (error) {
    const message = getFirebaseAuthErrorMessage(error)
    authErrorMessage.value = message
  } finally {
    loading.value = false
  }
}

async function handleGoogleLogin() {
  try {
    await userStore.googleLogin()

    handleRedirect()
  } catch (error) {
    authErrorMessage.value = 'Google login failed.'
  }
}

function handleRedirect() {
  const redirectUrl = userStore.redirectAfterLogin || { name: 'dashboard' }
  userStore.redirectAfterLogin = null

  router.push(redirectUrl)
}

function getFirebaseAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please try again.'
      case 'auth/user-not-found':
        return 'No account found with this email.'
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.'
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please wait and try again later.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.'
      default:
        return 'Login failed. Please try again.'
    }
  }

  return 'An unexpected error occurred.'
}
</script>
