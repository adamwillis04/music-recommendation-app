import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/AuthNavigator"
import { colors } from "../styles/colors"

type Props = NativeStackScreenProps<AuthStackParamList, "Landing">

export default function LandingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MusicShare</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignContent: "center",
    padding: 24
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 32,
    textAlign: "center"
  }
})