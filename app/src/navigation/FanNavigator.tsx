import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FanHomeScreen from "../screens/FanScreens/FanHomeScreen"
import FanProfileScreen from "../screens/FanScreens/FanProfileScreen"
import { Artist } from "../types/artist"
import FanArtistScreen from "../screens/FanScreens/FanArtistScreen"
import RecommendationScreen from "../screens/RecommendationScreens/RecommendationScreen"

export type FanStackParamList = {
  FanHome: undefined
  FanProfile: undefined
  Recommendations: { initialTab: string, artist?: Artist | undefined}
  FanArtist: { artist?: Artist | undefined }
}

const Stack = createNativeStackNavigator<FanStackParamList>()

export default function FanNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FanHome" component={FanHomeScreen}/>
        <Stack.Screen name="FanProfile" component={FanProfileScreen}/>
        <Stack.Screen name="Recommendations" component={RecommendationScreen}/>
        <Stack.Screen name="FanArtist" component={FanArtistScreen}/>
    </Stack.Navigator>
  )
}