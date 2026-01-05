import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/AuthNavigator"

type Props = NativeStackScreenProps<AuthStackParamList, "Landing">

export default function LandingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>MusicShare</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
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