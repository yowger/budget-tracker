import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { auth, googleProvider } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    user: {
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
    },
    redirectAfterLogin: null as string | null,
  }),
  actions: {
    setUser(user: any) {
      this.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    },
    clearUser() {
      this.user = {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
      }
    },
    async emailLogin(email: string, password: string) {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      this.setUser(user)
    },
    async emailRegister(email: string, password: string) {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      this.setUser(result.user)
    },
    async googleLogin() {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      this.setUser(user)
    },
    async signOut() {
      await signOut(auth)
      this.clearUser()
    },
  },
})
