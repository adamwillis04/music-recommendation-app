import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import AuthNavigator from "./AuthNavigator" 
import RoleNavigator from "./RoleNavigator"

export default function RootNavigator() {
  const { currentUser } = useAuth()

  return (
    <NavigationContainer>
      {!currentUser ? <AuthNavigator /> : <RoleNavigator />}
    </NavigationContainer>
  )
}
