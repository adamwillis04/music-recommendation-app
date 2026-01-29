import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getDoc, doc, collection, onSnapshot, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore"
import { Profile } from "../types/profile"
import { useAuth } from "./AuthContext"
import { db } from "../services/config"
import { Artist } from "../types/artist"
import * as Location from "expo-location"
import { Reward } from "../types/reward"

interface ProfileContextType {
  profile: Profile | null
  loading: boolean
  likedArtists: Artist[] 
  rewards: Reward[]
  like: (artist: Artist) => Promise<void>
  unlike: (artist: Artist) => Promise<void>
  updateProfile: (updates: any) => void
  getCurrentLocation: () => Promise<{lat: number, lng: number} | null>
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
  const [likedArtists, setLikedArtists] = useState<Artist[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
        setProfile(null)
        setLikedArtists([])
        setRewards([])
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
    const rewardsRef = collection(db, "users", currentUser.uid, "rewards")

    const unsubscribeLiked = onSnapshot(likedRef, snapshot => {
      const artists: Artist[] = snapshot.docs.map(doc => ({
        mbid: doc.id,
        ...(doc.data() as Omit<Artist, "mbid">),
      }))
      setLikedArtists(artists)
    })

    const unsubscribeRewards = onSnapshot(rewardsRef, snapshot => {
      const rewards: Reward[] = snapshot.docs.map(doc => ({
        id: doc.id, // or rewardId, etc — match your type
        ...(doc.data() as Omit<Reward, "id">),
      }))
      setRewards(rewards)
    })

    setLoading(false)

    return () => {
      unsubscribeLiked()
      unsubscribeRewards()
    }
  }, [currentUser])

  const like = async (artist: Artist) => {
    if (!currentUser) return
  
    setLikedArtists(prev => {
      if (prev.some(a => a.mbid === artist.mbid)) return prev
      return [...prev, artist]
    })
  
    await setDoc(
      doc(db, "users", currentUser.uid, "likedArtists", artist.mbid),
      {
        name: artist.name,
        verified: artist.verified,
        country: artist.country,
        tags: artist.tags,
        likedAt: serverTimestamp(),
      }
    )
  }

  const unlike = async (artist: Artist) => {
    if (!currentUser) return
  
    setLikedArtists(prev =>
      prev.filter(a => a.mbid !== artist.mbid)
    )
  
    await deleteDoc(
      doc(db, "users", currentUser.uid, "likedArtists", artist.mbid)
    )
  }

  const updateProfile = (updates: any) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const getCurrentLocation = async () => {
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return { lat: loc.coords.latitude, lng: loc.coords.longitude };
  };

  const value: ProfileContextType = {
    profile,
    loading,
    likedArtists,
    rewards,
    like,
    unlike,
    updateProfile,
    getCurrentLocation
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}