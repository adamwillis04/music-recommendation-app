import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"
import { useProfile } from "../../contexts/ProfileContext"
import Header from "../../components/Header"

type Props = NativeStackScreenProps<FanStackParamList, "FanProfile">

export default function FanProfileScreen({ navigation }: Props) {
  const { profile } = useProfile()

  return (
    <View>
      <Header
        title="Profile"
        onBack={() => navigation.goBack()}
        onProfile={() => navigation.navigate("FanProfile")}
      />
    </View>
  )
}