import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"
import { useProfile } from "../../contexts/ProfileContext"
import Header from "../../components/Header"

type Props = NativeStackScreenProps<FanStackParamList, "FanHome">

export default function FanHomeScreen({ navigation }: Props) {
  const { profile } = useProfile()

  // artist / venue tab
  // artist search / venue search 
  // show saved artists / venues 
  // FAB for scanning
  return (
    <View>
      <Header
        title="MusicShare"
        onProfile={() => navigation.navigate("FanProfile")}
      />
    </View>
  )
}