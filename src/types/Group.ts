import { FieldValue, Timestamp } from 'firebase/firestore'

export interface Group {
  id: string
  groupName: string
  ownerId: string
  members: string[]
  preferredCurrencies: string[]
  createdAt: Timestamp | FieldValue | null
}
