import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/includes/firebase'

export interface CreateCategory {
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
}

async function addCategory(category: CreateCategory, userId: string) {
  return await addDoc(collection(db, 'categories'), {
    ...category,
    uid: userId,
    isArchived: false,
    createdAt: serverTimestamp(),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ category, userId }: { category: CreateCategory; userId: string }) => {
      return addCategory(category, userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
