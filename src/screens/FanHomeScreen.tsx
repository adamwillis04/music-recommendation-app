import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../navigation/FanNavigator"
import { useAuth } from "../contexts/AuthContext"

type Props = NativeStackScreenProps<FanStackParamList, "FanHome">

export default function FanHomeScreen({ navigation }: Props) {
  const { currentUser } = useAuth()

  return (
    <View style={styles.container}>
      <Text>Fan Home</Text>
      <Text>{currentUser?.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  }
})