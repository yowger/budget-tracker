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

function getUserTransactionsByCategory(
  categoryId: string,
  userId: string,
): Promise<QuerySnapshot<DocumentData>> {
  const transactionsRef = collection(db, 'transactions')
  const q = query(
    transactionsRef,
    where('categoryId', '==', categoryId),
    where('uid', '==', userId),
  )

  return getDocs(q)
}

export async function deleteCategory(categoryId: string, userId: string): Promise<boolean> {
  const transactionsSnapshot = await getUserTransactionsByCategory(categoryId, userId)

  if (!transactionsSnapshot.empty) {
    return false
  }

  const categoryRef = doc(db, 'categories', categoryId)
  await deleteDoc(categoryRef)

  return true
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ categoryId, userId }: { categoryId: string; userId: string }) => {
      return deleteCategory(categoryId, userId)
    },
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      }
    },
  })
}
