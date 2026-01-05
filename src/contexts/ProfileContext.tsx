import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getDoc, doc } from "firebase/firestore"
import { Profile } from "../types/profile"
import { useAuth } from "./AuthContext"
import { db } from "../services/config"

interface ProfileContextType {
  profile: Profile | null
  loading: boolean
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
        setProfile(null)
        setLoading(false)
        return
    }

    const loadProfile = async () => {
        setLoading(true)
        const result = await getDoc(doc(db, "users", currentUser.uid))
        setProfile(result.exists() ? (result.data() as Profile) : null)
        setLoading(false)
    }

    loadProfile()
  }, [currentUser])

  return <ProfileContext.Provider value={{ profile, loading }}>{children}</ProfileContext.Provider>
}