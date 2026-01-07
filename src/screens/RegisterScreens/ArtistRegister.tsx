import React, { useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useRegister } from "../../contexts/RegisterContext"
import ArtistPicker from "../../components/ArtistPicker"
import VerMethodPicker from "../../components/VerMethodPicker"
import { colors } from "../../styles/colors"

export default function ArtistRegister() {
  const { form, updateForm } = useRegister()

  useFocusEffect(
    useCallback(() => {
      updateForm({ role: "artist" }) 
    }, [])
  )

  return (
    <>
      <ArtistPicker 
        artist={ form.artist ?? null } 
        onSelect={artist => updateForm({ artist })}
        showVerified={false}
        isSearch={false}
        placeholder="Choose Artist *"
      />

      <VerMethodPicker 
        verMethod={ form.verMethod ?? null }
        onSelect={verMethod => updateForm({ verMethod })}
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