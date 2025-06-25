import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import type { User } from '@/types/User'

interface UpdateUserInput {
  uid: string
  data: Partial<User>
}

async function updateUser({ uid, data }: UpdateUserInput): Promise<User> {
  const userRef = doc(db, 'users', uid)

  await updateDoc(userRef, data)

  const updatedSnapshot = await getDoc(userRef)
  return updatedSnapshot.data() as User
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user', updatedUser.uid], updatedUser)
    },
  })
}
