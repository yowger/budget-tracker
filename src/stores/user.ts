import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

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
    async googleLogin() {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user
        this.setUser(user)
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const errorCode = error.code
          const errorMessage = error.message
        }
      }
    },
    async signOut() {
      await signOut(auth)
      this.clearUser()
    },
  },
})


