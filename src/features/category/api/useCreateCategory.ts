import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { QUERY_KEYS } from '@/features/category/api/queryKeys'
import { db } from '@/includes/firebase'

export interface CreateCategoryInput {
  uid: string
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
}

async function addCategory(category: CreateCategoryInput) {
  return await addDoc(collection(db, 'categories'), {
    ...category,
    isArchived: false,
    createdAt: serverTimestamp(),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
  })
}
