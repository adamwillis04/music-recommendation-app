import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import LandingScreen from "../screens/LandingScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import FanHomeScreen from "../screens/FanHomeScreen"
import { useAuth } from "../contexts/AuthContext"

export type RootStackParamList = {
  Landing: undefined
  Login: undefined
  Register: undefined
  FanHome: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const { currentUser } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUser ? (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}/>
          </>
        ) : (
          <>
            <Stack.Screen name="FanHome" component={FanHomeScreen} options={{ headerShown: false}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
