import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FanHomeScreen from "../screens/FanScreens/FanHomeScreen"
import FanProfileScreen from "../screens/FanScreens/FanProfileScreen"
import ScanScreen from "../screens/ScanScreens/ScanScreen"
import { Artist } from "../types/artist"
import FanArtistScreen from "../screens/FanScreens/FanArtistScreen"

export type FanStackParamList = {
  FanHome: undefined
  FanProfile: undefined
  Scan: undefined
  FanArtist: { artist?: Artist | undefined }
}

const Stack = createNativeStackNavigator<FanStackParamList>()

export default function FanNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FanHome" component={FanHomeScreen}/>
        <Stack.Screen name="FanProfile" component={FanProfileScreen}/>
        <Stack.Screen name="Scan" component={ScanScreen}/>
        <Stack.Screen name="FanArtist" component={FanArtistScreen}/>
    </Stack.Navigator>
  )
}