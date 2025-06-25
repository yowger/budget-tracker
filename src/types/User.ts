import { Timestamp, FieldValue } from 'firebase/firestore'

import { type SetupStep } from '@/constants/setupSteps'

export type User = {
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
