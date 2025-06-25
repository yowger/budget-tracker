import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { QUERY_KEYS as SETUP_QUERY_KEYS } from './queryKeys'
import type { Group } from '@/types/Group'

export interface CreateGroupInput {
  groupName: string
  ownerId: string
  members: string[]
}

async function createGroup(groupInput: CreateGroupInput): Promise<Group> {
  const groupId = crypto.randomUUID()
  const groupRef = doc(db, 'groups', groupId)

  const newGroup: Group = {
    id: groupId,
    ...groupInput,
    preferredCurrencies: [],
    createdAt: serverTimestamp(),
  }

  await setDoc(groupRef, newGroup)

  return newGroup
}

export function useCreateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SETUP_QUERY_KEYS.group, data.id],
      })
    },
  })
}
