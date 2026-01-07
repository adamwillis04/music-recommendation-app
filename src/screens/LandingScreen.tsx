import React, { useState } from "react"
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/AuthNavigator"
import { colors } from "../styles/colors"
import { useAuth } from "../contexts/AuthContext"

type Props = NativeStackScreenProps<AuthStackParamList, "Landing">

export default function LandingScreen({ navigation }: Props) {
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
      <Text style={styles.title}>MusicShare</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.white}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.white}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button} >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
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
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    marginVertical: 10
  },
  buttonText: { fontSize: 20, fontWeight: "500", color: colors.primary, textAlign: "center", },
  divider: { height: 3, backgroundColor: colors.white, marginVertical: 10},
  input: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
    color: colors.white
  },
})