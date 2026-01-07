import React, { useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useRegister } from "../../contexts/RegisterContext"
import { colors } from "../../styles/colors"

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
        placeholder="Username *"
        placeholderTextColor={colors.black}
        autoCapitalize="none"
        value={form.username}
        onChangeText={username => updateForm({ username })}
        style={[styles.input, {marginTop: 20}]}
      />

      <TextInput
        placeholder="Sign-Up Reward Code"
        placeholderTextColor={colors.black}
        autoCapitalize="none"
        value={form.artistCode}
        onChangeText={artistCode => updateForm({ artistCode })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email *"
        placeholderTextColor={colors.black}
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={email => updateForm({ email })}
        style={styles.input}
      />

      <TextInput
        placeholder="Password *"
        placeholderTextColor={colors.black}
        secureTextEntry
        value={form.password}
        onChangeText={password => updateForm({ password })}
        style={styles.input}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    color: colors.black,
    backgroundColor: colors.white
  },
})