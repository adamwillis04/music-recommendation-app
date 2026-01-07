import React, { useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useRegister } from "../../contexts/RegisterContext"
import ArtistPicker from "../../components/ArtistPicker"
import VerMethodPicker from "../../components/VerMethodPicker"

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
      />

      <VerMethodPicker 
        verMethod={ form.verMethod ?? null }
        onSelect={verMethod => updateForm({ verMethod })}
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