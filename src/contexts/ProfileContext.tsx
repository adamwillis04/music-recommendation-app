import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getDoc, doc, collection, onSnapshot, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore"
import { Profile } from "../types/profile"
import { useAuth } from "./AuthContext"
import { db } from "../services/config"

interface ProfileContextType {
  profile: Profile | null
  loading: boolean
  likedArtists: Set<string>
  like: (mbid: string) => Promise<void>
  unlike: (mbid: string) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | null>(null)

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext)
  if (!context) throw new Error("profile context is null")
  return context
}

interface Props {
  children: ReactNode
}

export const ProfileProvider: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [likedArtists, setLikedArtists] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
        setProfile(null)
        setLikedArtists(new Set())
        setLoading(false)
        return
    }
    
    setLoading(true)

    const loadProfile = async () => {
        const result = await getDoc(doc(db, "users", currentUser.uid))
        setProfile(result.exists() ? (result.data() as Profile) : null)
    }
      
    loadProfile()

    const likedRef = collection(db, "users", currentUser.uid, "likedArtists")

    const unsubscribe = onSnapshot(likedRef, (snapshot) => {
      const set = new Set<string>()
      snapshot.forEach(doc => set.add(doc.id))
      setLikedArtists(set)
      setLoading(false)
    })

    return unsubscribe
  }, [currentUser])

  const like = async (mbid: string) => {
    if (!currentUser) return

    setLikedArtists(prev => new Set(prev).add(mbid))

    await setDoc(
      doc(db, "users", currentUser.uid, "likedArtists", mbid),
      { likedAt: serverTimestamp() }
    )
  }

  const unlike = async (mbid: string) => {
    if (!currentUser) return

    setLikedArtists(prev => {
      const next = new Set(prev)
      next.delete(mbid)
      return next
    })

    await deleteDoc(
      doc(db, "users", currentUser.uid, "likedArtists", mbid)
    )
  }

  const value: ProfileContextType = {
    profile,
    loading,
    likedArtists,
    like,
    unlike
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}