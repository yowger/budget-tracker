import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { useQuery } from '@tanstack/vue-query'

export type Color = {
  id: string
  name: string
  value: string
}

async function getColors(): Promise<Color[]> {
  const querySnapshot = await getDocs(collection(db, 'colors'))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Color, 'id'>),
  }))
}

export function useGetColors() {
  return useQuery({
    queryKey: ['colors'],
    queryFn: getColors,
  })
}
