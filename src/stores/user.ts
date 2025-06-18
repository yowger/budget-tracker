import { defineStore } from 'pinia'
import { Timestamp, FieldValue } from 'firebase/firestore'

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

export const useUserStore = defineStore('user', {
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
  },
})
