import { useQuery } from '@tanstack/vue-query'
import { getDocs, collection } from 'firebase/firestore'

import { db } from '@/includes/firebase'

export type Currency = {
  currency: string
}

export async function getCurrencies(): Promise<Currency[]> {
  const snapshot = await getDocs(collection(db, 'currencies'))
  return snapshot.docs.map((doc) => doc.data() as Currency)
}

export function useGetCurrency() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    select: (data) =>
      data.map((c) => ({
        name: c.currency,
        value: c.currency,
      })),
  })
}
