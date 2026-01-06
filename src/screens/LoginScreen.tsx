import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/AuthNavigator"
import { useAuth } from "../contexts/AuthContext"
import Header, { HEADER_HEIGHT } from "../components/Header"

type Props = NativeStackScreenProps<AuthStackParamList, "Login">

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields")
      return
    }
    
    try {
      setLoading(true)
      await login(email, password)
    } catch (error: any) {
      Alert.alert("Registration failed", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Login"
        onBack={() => navigation.navigate("Landing")}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Loading..." : "Login"}
        onPress={handleLogin}
      />

      <Button
        title="Don't have an account? Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: HEADER_HEIGHT,
  },
})
