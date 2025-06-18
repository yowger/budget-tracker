import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, Timestamp, FieldValue } from 'firebase/firestore'

import { auth, db, googleProvider } from '@/includes/firebase'
import { SETUP_STEPS, type SetupStep } from '@/constants/setupSteps'

export type UserState = {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  groupIds: string[]
  defaultGroupId: string | null
  defaultCurrencyId: string | null
  preferredCurrencies: string[]
  setupStep: SetupStep
  createdAt: Timestamp | FieldValue | null
}

export default defineStore('user', {
  state: () => ({
    user: {
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      groupIds: [],
      defaultGroupId: null,
      defaultCurrencyId: null,
      preferredCurrencies: [],
      setupStep: SETUP_STEPS.GROUP,
      createdAt: null,
    } as UserState,
    redirectAfterLogin: null as string | null,
  }),
  actions: {
    setUser(user: Partial<UserState>) {
      this.user = {
        ...this.user,
        ...user,
      }
    },
    clearUser() {
      this.user = {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        groupIds: [],
        defaultGroupId: null,
        defaultCurrencyId: null,
        preferredCurrencies: [],
        setupStep: SETUP_STEPS.GROUP,
        createdAt: null,
      }
    },
    async createUserProfile(user: User): Promise<UserState> {
      try {
        const userRef = doc(db, 'users', user.uid)

        const userProfile: UserState = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          groupIds: [],
          defaultGroupId: null,
          defaultCurrencyId: null,
          preferredCurrencies: [],
          setupStep: SETUP_STEPS.GROUP,
          createdAt: serverTimestamp(),
        }

        await setDoc(userRef, userProfile, { merge: true })

        return userProfile
      } catch (error) {
        throw error
      }
    },
    async fetchUserProfile(uid: string): Promise<UserState | null> {
      try {
        const userRef = doc(db, 'users', uid)
        const snapshot = await getDoc(userRef)

        if (!snapshot.exists()) {
          return null
        }

        return {
          ...snapshot.data(),
          displayName: snapshot.data().displayName || '',
          photoURL: snapshot.data().photoURL || '',
        } as UserState
      } catch (error) {
        throw error
      }
    },
    async emailRegister(email: string, password: string) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password)

        const user = result.user
        const createdUser = await this.createUserProfile(user)
        this.setUser(createdUser)
      } catch (error) {
        throw error
      }
    },
    async emailLogin(email: string, password: string) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)

        const user = result.user
        const userProfile = await this.fetchUserProfile(user.uid)
        this.setUser(userProfile ?? (await this.createUserProfile(user)))
      } catch (error) {
        throw error
      }
    },
    async googleLogin() {
      try {
        const result = await signInWithPopup(auth, googleProvider)

        const user = result.user
        const userProfile = await this.fetchUserProfile(user.uid)
        this.setUser(userProfile ?? (await this.createUserProfile(user)))
      } catch (error) {
        throw error
      }
    },
    async signOut() {
      await signOut(auth)
      this.clearUser()
    },
  },
})
