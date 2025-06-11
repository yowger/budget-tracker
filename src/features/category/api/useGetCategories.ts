import { collection, getDocs, query, where } from 'firebase/firestore'
import { useQuery } from '@tanstack/vue-query'

import { icons } from '@/constants/icons'
import { db } from '@/includes/firebase'
import { QUERY_KEYS } from '@/features/category/api/queryKeys'

export type Category = {
  id: string
  name: string
  type: 'expense' | 'income'
  icon: string
  color: string
  transactions: 0
  isArchived: boolean
  createdAt?: unknown
  updatedAt?: unknown
}

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
          id: category.id,
          name: category.name,
          icon: icon,
          type: category.type,
          color: category.color,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          transactions: 0,
        }
      })
    },
    enabled: !!userId,
  })
}
