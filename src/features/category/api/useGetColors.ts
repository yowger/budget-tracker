import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEYS } from '@/features/category/api/queryKeys'

export type Color = {
  id: string
  name: string
  value: string
}

async function getColors(): Promise<Color[]> {
  const querySnapshot = await getDocs(collection(db, 'colors'))

  if (querySnapshot.empty) return []

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Color, 'id'>),
  }))
}

export function useGetColors() {
  return useQuery({
    queryKey: QUERY_KEYS.colors,
    queryFn: getColors,
    staleTime: 1000 * 60 * 60 * 24,
  })
}
