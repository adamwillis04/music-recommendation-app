import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FanHomeScreen from "../screens/FanScreens/FanHomeScreen"
import FanProfileScreen from "../screens/FanScreens/FanProfileScreen"

export type FanStackParamList = {
  FanHome: undefined
  FanProfile: undefined
}

const Stack = createNativeStackNavigator<FanStackParamList>()

export default function FanNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FanHome" component={FanHomeScreen}/>
        <Stack.Screen name="FanProfile" component={FanProfileScreen}/>
    </Stack.Navigator>
  )
}