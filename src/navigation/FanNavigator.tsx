import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FanHomeScreen from "../screens/FanHomeScreen"

export type FanStackParamList = {
  FanHome: undefined
}

const Stack = createNativeStackNavigator<FanStackParamList>()

export default function FanNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FanHome" component={FanHomeScreen}/>
    </Stack.Navigator>
  )
}