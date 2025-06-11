import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import useUserStore from '@/stores/user'

export interface CreateCategory {
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
}

async function addCategory(category: CreateCategory) {
  const user = useUserStore().user

  const unauthenticated = !user?.uid
  if (unauthenticated) {
    throw new Error('User not authenticated')
  }

  return await addDoc(collection(db, 'categories'), {
    ...category,
    uid: user.uid,
    isArchived: false,
    createdAt: serverTimestamp(),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
