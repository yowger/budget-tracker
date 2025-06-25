import { defineStore } from 'pinia'

import { SETUP_STEPS } from '@/constants/setupSteps'
import type { User } from '@/types/User'

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
    } as User,
    redirectAfterLogin: null as string | null,
  }),
  actions: {
    setUser(user: Partial<User>) {
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
