import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { QUERY_KEYS } from '@/features/category/api/queryKeys'

export type DeleteCategoryInput = {
  categoryId: string
  userId: string
}

function getUserTransactionsByCategory(
  input: DeleteCategoryInput,
): Promise<QuerySnapshot<DocumentData>> {
  const transactionsRef = collection(db, 'transactions')
  const q = query(
    transactionsRef,
    where('categoryId', '==', input.categoryId),
    where('uid', '==', input.userId),
  )

  return getDocs(q)
}

export async function deleteCategory(input: DeleteCategoryInput): Promise<boolean> {
  const transactionsSnapshot = await getUserTransactionsByCategory(input)

  if (!transactionsSnapshot.empty) {
    return false
  }

  const categoryRef = doc(db, 'categories', input.categoryId)
  await deleteDoc(categoryRef)

  return true
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      }
    },
  })
}
