<template>
  <div>
    <form v-on:submit.prevent="HandleLogin">
      <div class="flex flex-col">
        <label for="email">email</label>
        <input-text v-model="email" placeholder="Email" />
        <label for="password">password</label>
        <input-text type="password" v-model="password" placeholder="Password" />
      </div>
      <Button type="submit">Login with Email</Button>
    </form>

    <Button v-on:click="HandleGoogleLogin()">Login with Google</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useUserStore from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

async function HandleLogin() {
  await userStore.emailLogin(email.value, password.value)

  handleRedirect()
}

async function HandleGoogleLogin() {
  await userStore.googleLogin()

  handleRedirect()
}

async function handleRedirect() {
  const redirectUrl = userStore.redirectAfterLogin || { name: 'dashboard' }
  userStore.redirectAfterLogin = null

  router.push(redirectUrl)
}
</script>
