import { doc, updateDoc } from 'firebase/firestore'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { db } from '@/includes/firebase'
import { QUERY_KEYS } from './queryKeys'

export function useArchiveCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const ref = doc(db, 'categories', categoryId)
      await updateDoc(ref, { archived: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
  })
}
