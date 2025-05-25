<template>
  <Form v-bind:initialValues :resolver @submit="HandleLoginFormSubmit">
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div
        class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-col items-center gap-2 w-full">
            <h1 class="text-3xl md:text-4xl font-medium text-center mx-auto leading-[125%] mb-2">
              Welcome <br />
              To BudgetMate
            </h1>
          </div>
        </div>

        <div class="flex flex-col gap-6 w-full">
          <Button
            @click="HandleGoogleLogin"
            label="Sign in with Google"
            icon="pi pi-google"
            variant="outlined"
            class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          >
          </Button>

          <div class="flex items-center gap-4">
            <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
            <span class="text-surface-400 dark:text-surface-600 font-medium text-sm">or</span>
            <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label
              for="email1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Email Address</label
            >
            <form-field v-slot="$field" name="email" class="flex flex-col gap-1.5">
              <input-text
                id="email1"
                type="text"
                placeholder="Email address"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
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
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label
              for="password1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Password</label
            >
            <form-field v-slot="$field" name="password" class="flex flex-col gap-1.5">
              <input-text
                id="password1"
                type="password"
                placeholder="Password"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                <ul class="my-0 px-4 flex flex-col gap-1">
                  <li v-for="(error, index) of $field.errors" :key="index">
                    <span>{{ error.message }}</span>
                  </li>
                </ul>
              </Message>
            </form-field>
          </div>
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
          >
            <div class="flex items-center gap-2">
              <Checkbox id="rememberme1" :binary="true" />
              <label for="rememberme1" class="text-surface-900 dark:text-surface-0 leading-normal"
                >Remember me</label
              >
            </div>
            <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis"
              >Forgot your password?</a
            >
          </div>
        </div>
        <Button
          type="submit"
          label="Login"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
        >
        </Button>

        <div class="text-center w-full">
          <span class="text-surface-700 dark:text-surface-200 leading-normal">Not registered?</span>
          <a class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis"
            >Create an Account</a
          >
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import useUserStore from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters.' })
    .max(127, { message: 'Maximum 127 characters.' })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Must have an uppercase letter.',
    }),
})

type LoginForm = z.infer<typeof loginSchema>

const initialValues = reactive<LoginForm>({
  email: '',
  password: '',
})

const resolver = zodResolver(loginSchema)

async function HandleLoginFormSubmit(form: FormSubmitEvent) {
  if (form.valid) {
    try {
      await userStore.emailLogin(form.values.email, form.values.password)
      handleRedirect()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }
}

async function HandleGoogleLogin(): Promise<void> {
  try {
    await userStore.googleLogin()
    handleRedirect()
  } catch (err) {
    console.error('Google login failed:', err)
  }
}

function handleRedirect(): void {
  const redirectUrl = userStore.redirectAfterLogin || { name: 'dashboard' }
  userStore.redirectAfterLogin = null

  router.push(redirectUrl)
}
</script>
