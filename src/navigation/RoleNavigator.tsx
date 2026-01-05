import React from "react"
import { View, ActivityIndicator } from "react-native"
import { useProfile } from "../contexts/ProfileContext"
import AuthNavigator from "./AuthNavigator"
import FanNavigator from "./FanNavigator"

export default function RoleNavigator() {
    const { profile, loading } = useProfile()

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )
    }

    if (!profile) return <AuthNavigator />

    switch (profile?.role) {
        case "fan": return <FanNavigator />
        //case "artist": return <ArtistNavigator />
        //case "venue": return <VenueNavigator />
        //case "admin": return <AdminNavigator />
        default: return <AuthNavigator />
    }
}