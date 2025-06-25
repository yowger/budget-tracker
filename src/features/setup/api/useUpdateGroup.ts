import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import { db } from '@/includes/firebase'
import { QUERY_KEYS as SETUP_QUERY_KEYS } from './queryKeys'
import type { Group } from '@/types/Group'

interface UpdateGroupInput {
  groupId: string
  data: Partial<Group>
}

async function updateGroup({ groupId, data }: UpdateGroupInput): Promise<Group> {
  const groupRef = doc(db, 'groups', groupId)
  await updateDoc(groupRef, data)

  const updatedSnap = await getDoc(groupRef)
  return updatedSnap.data() as Group
}

export function useUpdateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [SETUP_QUERY_KEYS.group, variables.groupId],
      })
    },
  })
}
