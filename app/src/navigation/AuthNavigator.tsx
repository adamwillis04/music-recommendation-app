import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LandingScreen from "../screens/LandingScreen"
import { RegisterProvider } from "../contexts/RegisterContext"
import RegisterScreen from "../screens/RegisterScreens/RegisterScreen"

export type AuthStackParamList = {
  Landing: undefined
  Register: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen}/>
        <Stack.Screen name="Register">
          {props => (
            <RegisterProvider>
              <RegisterScreen {...props} />
            </RegisterProvider>
          )}
        </Stack.Screen>
    </Stack.Navigator>
  )
}