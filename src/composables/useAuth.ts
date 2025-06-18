import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

import { SETUP_STEPS } from '@/constants/setupSteps'
import { auth, db, googleProvider } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  async function createUserProfile(user: User) {
    const userRef = doc(db, 'users', user.uid)

    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      groupIds: [],
      defaultGroupId: null,
      defaultCurrencyId: null,
      preferredCurrencies: [],
      setupStep: SETUP_STEPS.GROUP,
      createdAt: serverTimestamp(),
    }

    await setDoc(userRef, userProfile, { merge: true })

    return userProfile
  }

  async function fetchUserProfile(uid: string) {
    const userRef = doc(db, 'users', uid)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) return null

    return {
      ...snapshot.data(),
      displayName: snapshot.data().displayName || '',
      photoURL: snapshot.data().photoURL || '',
    }
  }

  async function emailRegister(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      const profile = await createUserProfile(user)
      userStore.setUser(profile)
    } catch (error) {
      throw error
    }
  }

  async function emailLogin(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      const profile = (await fetchUserProfile(user.uid)) || (await createUserProfile(user))
      userStore.setUser(profile)
    } catch (error) {
      throw error
    }
  }

  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const profile = (await fetchUserProfile(user.uid)) || (await createUserProfile(user))
      userStore.setUser(profile)
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    await firebaseSignOut(auth)
    userStore.clearUser()
  }

  return {
    emailRegister,
    emailLogin,
    googleLogin,
    signOut,
    fetchUserProfile,
    createUserProfile,
  }
}
