import { collection, getDocs, query, where } from 'firebase/firestore'
import { useQuery } from '@tanstack/vue-query'

import { icons } from '@/constants/icons'
import { db } from '@/includes/firebase'
import { QUERY_KEYS } from '@/features/category/api/queryKeys'
import type { Category } from '@/types/Category'

async function getCategories(userId: string): Promise<Category[]> {
  const q = query(collection(db, 'categories'), where('uid', '==', userId))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return []

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Category, 'id'>),
  }))
}

export function useGetCategories(userId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => getCategories(userId as string),
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      return data.map((category) => {
        const icon =
          icons.find((opt) => opt.label.toLowerCase() === category.icon.toLowerCase())?.value ??
          'pi pi-question'

        return {
          ...category,
          icon,
          transactions: 0,
        }
      }) as Category[]
    },
    enabled: !!userId,
  })
}
