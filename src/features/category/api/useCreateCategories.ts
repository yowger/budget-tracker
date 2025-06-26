import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { QUERY_KEYS } from '@/features/category/api/queryKeys'
import { db } from '@/includes/firebase'

export interface CreateCategoriesInput {
  groupId: string
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
}

async function addCategories(categories: CreateCategoriesInput[]) {
  const categoryRef = collection(db, 'categories')

  const createPromises = categories.map((category) =>
    addDoc(categoryRef, {
      ...category,
      isArchived: false,
      createdAt: serverTimestamp(),
    }),
  )

  return Promise.all(createPromises)
}

export function useCreateCategories() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
  })
}
