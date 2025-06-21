import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { type UserState } from '@/stores/user'

export async function getUser(uid: string): Promise<UserState | undefined> {
  const userRef = doc(db, 'users', uid)
  const snapshot = await getDoc(userRef)

  return snapshot.data() as UserState
}
