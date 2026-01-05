import React, { useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useRegister } from "../../contexts/RegisterContext"

export default function FanRegister() {
  const { form, updateForm } = useRegister()

  useFocusEffect(
    useCallback(() => {
      updateForm({ role: "fan" }) 
    }, [])
  )

  return (
    <>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        value={form.username}
        onChangeText={username => updateForm({ username })}
      />

      <TextInput
        placeholder="Artist Code"
        autoCapitalize="none"
        value={form.artistCode}
        onChangeText={artistCode => updateForm({ artistCode })}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={email => updateForm({ email })}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={password => updateForm({ password })}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  }
})