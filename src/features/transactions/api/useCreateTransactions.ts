import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/includes/firebase'

export type CreateTransactionInput = {
  uid: string
  amount: number
  currencyId: string
  categoryId: string
  date: Date
  note?: string
  type: 'income' | 'expense'
}

export async function createTransaction(data: CreateTransactionInput) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await addDoc(collection(db, 'transactions'), payload)
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
