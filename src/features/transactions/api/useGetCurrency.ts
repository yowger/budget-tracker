import { useQuery } from '@tanstack/vue-query'
import { getDocs, collection } from 'firebase/firestore'

import { db } from '@/includes/firebase'

export type Currency = {
  id: string
  currency: string
  name: string
}

export async function getCurrencies(): Promise<Currency[]> {
  const snapshot = await getDocs(collection(db, 'currencies'))

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Currency, 'id'>),
  }))
}

export function useGetCurrency() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
  })
}
