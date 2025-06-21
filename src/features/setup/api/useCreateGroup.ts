import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import { SETUP_STEPS } from '@/constants/setupSteps'
import { QUERY_KEYS as SETUP_QUERY_KEYS } from '@/features/setup/api/queryKeys'
import { db } from '@/includes/firebase'
import type { UserState } from '@/stores/user'

export interface CreateGroupInput {
  groupName: string
  ownerId: string
  members: string[]
}

async function createGroup(group: CreateGroupInput): Promise<UserState> {
  const groupId = crypto.randomUUID()
  const groupRef = doc(db, 'groups', groupId)

  await setDoc(groupRef, {
    id: groupId,
    ...group,
    createdAt: serverTimestamp(),
  })

  const userRef = doc(db, 'users', group.ownerId)

  await updateDoc(userRef, {
    groupIds: arrayUnion(groupId),
    defaultGroupId: groupId,
    setupStep: SETUP_STEPS.CURRENCY,
  })

  const updatedSnapshot = await getDoc(userRef)
  return updatedSnapshot.data() as UserState
}

export function useCreateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETUP_QUERY_KEYS.group })
    },
  })
}
