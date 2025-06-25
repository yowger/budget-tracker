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