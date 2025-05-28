<template>
  <Form v-bind:initialValues :resolver @submit="onSubmit">
    <div class="flex flex-col gap-6 w-full">
      <Button
        @click="onGoogleLogin"
        v-bind:disabled="loading"
        label="Continue with Google"
        icon="pi pi-google"
        variant="outlined"
        class="w-full py-2 rounded-lg"
      ></Button>

      <div class="flex items-center gap-4">
        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
        <span class="text-surface-400 dark:text-surface-600 text-sm">or</span>
        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email">Email Address</label>
        <form-field v-slot="$field" name="email" class="flex flex-col gap-1.5">
          <input-text
            id="email"
            type="email"
            v-bind:disabled="loading"
            placeholder="Email address"
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

      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <form-field v-slot="$field" name="password" class="flex flex-col gap-1.5">
          <input-text
            id="password"
            type="password"
            v-bind:disabled="loading"
            placeholder="Password"
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

      <Message v-if="authError" severity="error" size="small">{{ authError }}</Message>

      <div class="flex justify-between items-center">
        <label><Checkbox id="rememberme" v-bind:binary="true" /> Remember me</label>
        <a class="text-primary cursor-pointer hover:text-primary-emphasis">Forgot your password?</a>
      </div>

      <Button
        type="submit"
        v-bind:disabled="loading"
        label="Login"
        class="w-full py-2 rounded-lg"
      ></Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const emit = defineEmits<{
  (e: 'login', form: { email: string; password: string }): void
  (e: 'googleLogin'): void
}>()

const loading = defineModel<boolean>('loading')
const authError = defineModel<string | null>('authError')

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, { message: 'Password is required.' }),
})

const initialValues = reactive({
  email: '',
  password: '',
})

const resolver = zodResolver(loginSchema)

function onSubmit(form: FormSubmitEvent) {
  if (form.valid) {
    const { email, password } = form.values
    emit('login', { email, password })
  }
}

function onGoogleLogin() {
  emit('googleLogin')
}
</script>
