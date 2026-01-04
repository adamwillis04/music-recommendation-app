import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User} from "firebase/auth"
import { auth } from "../services/config"

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  signUp: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  getUser: () => User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth used outside of AuthProvider container")
  return context
}

interface Props {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string): Promise<User> => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  }

  const signUp = async (email: string, password: string): Promise<User> => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    return res.user
  }

  const logout = async (): Promise<void> => {
    await signOut(auth)
  }

  const getUser = (): User | null => auth.currentUser

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signUp,
    logout,
    getUser
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

