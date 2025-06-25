import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import type { User } from '@/types/User'

export async function getUser(uid: string): Promise<User | undefined> {
  const userRef = doc(db, 'users', uid)
  const snapshot = await getDoc(userRef)

  return snapshot.data() as User
}
