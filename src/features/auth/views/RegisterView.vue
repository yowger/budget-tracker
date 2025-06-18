<template>
  <Form v-bind:initialValues :resolver @submit="handleRegisterFormSubmit">
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div
        class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-col items-center gap-2 w-full">
            <h1 class="text-3xl md:text-4xl font-medium text-center mx-auto leading-[125%] mb-2">
              Create Your <br />
              BudgetMate Account
            </h1>
          </div>
        </div>

        <div class="flex flex-col gap-6 w-full">
          <Button
            @click="handleGoogleRegister"
            v-bind:disabled="loading"
            label="Continue with Google"
            icon="pi pi-google"
            variant="outlined"
            class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          ></Button>

          <div class="flex items-center gap-4">
            <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
            <span class="text-surface-400 dark:text-surface-600 font-medium text-sm">or</span>
            <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
          </div>

          <form-field v-slot="$field" name="email" class="flex flex-col gap-2">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium"
              >Email</label
            >
            <input-text
              id="email"
              type="email"
              placeholder="Email address"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              v-bind:disabled="loading"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="px-4"
              >{{ $field.error?.message }}</Message
            >
          </form-field>

          <form-field v-slot="$field" name="password" class="flex flex-col gap-2">
            <label for="password" class="text-surface-900 dark:text-surface-0 font-medium"
              >Password</label
            >
            <input-text
              id="password"
              type="password"
              placeholder="Password"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              v-bind:disabled="loading"
            />
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              <ul class="my-0 px-4 flex flex-col gap-1">
                <li v-for="(error, index) of $field.errors" :key="index">
                  <span>{{ error.message }}</span>
                </li>
              </ul>
            </Message>
          </form-field>

          <form-field v-slot="$field" name="confirmPassword" class="flex flex-col gap-2">
            <label for="confirmPassword" class="text-surface-900 dark:text-surface-0 font-medium"
              >Confirm Password</label
            >
            <input-text
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              v-bind:disabled="loading"
            />
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              <span class="px-4">{{ $field.error?.message }}</span>
            </Message>
          </form-field>

          <Message v-if="authErrorMessage" severity="error" size="small">
            {{ authErrorMessage }}
          </Message>

          <Button
            type="submit"
            label="Register"
            v-bind:disabled="loading"
            class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          ></Button>

          <div class="text-center w-full">
            <span class="text-surface-700 dark:text-surface-200 leading-normal"
              >Already have an account?</span
            >
            <router-link
              v-bind:to="{ name: 'login' }"
              class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis"
              >Login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

import { useAuth } from '@/composables/useAuth'

const authErrorMessage = ref<string | null>(null)
const loading = ref(false)
const router = useRouter()
const { emailRegister, googleLogin } = useAuth()

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z
      .string()
      .min(6, { message: 'Minimum 6 characters.' })
      .max(127, { message: 'Maximum 127 characters.' })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Email must contain an uppercase letter.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

type RegisterForm = z.infer<typeof registerSchema>

const initialValues = reactive<RegisterForm>({
  email: '',
  password: '',
  confirmPassword: '',
})

const resolver = zodResolver(registerSchema)

async function handleRegisterFormSubmit(form: FormSubmitEvent) {
  if (form.valid) {
    authErrorMessage.value = null
    loading.value = true

    try {
      await emailRegister(form.values.email, form.values.password)

      router.push({ name: 'dashboard' })
    } catch (error) {
      const message = getFirebaseAuthErrorMessage(error)
      authErrorMessage.value = message
    } finally {
      loading.value = false
    }
  }
}

async function handleGoogleRegister(): Promise<void> {
  try {
    await googleLogin()

    router.push({ name: 'dashboard' })
  } catch (error) {
    authErrorMessage.value = 'Failed to register with Google. Please try again.'
    console.error('Google register failed:', error)
  }
}

function getFirebaseAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.'
      case 'auth/invalid-email':
        return 'Invalid email address.'
      case 'auth/weak-password':
        return 'Password is too weak.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.'
      default:
        return 'Registration failed. Please try again.'
    }
  }

  return 'An unexpected error occurred.'
}
</script>
