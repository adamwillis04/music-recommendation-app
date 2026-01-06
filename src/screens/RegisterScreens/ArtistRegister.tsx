import React, { useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useFocusEffect } from "@react-navigation/native"
import { useRegister } from "../../contexts/RegisterContext"
import { VERIFICATION_METHODS } from "../../types/verification"
import ArtistPicker from "../../components/ArtistPicker"

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
      />

      <Picker 
        selectedValue={form.verMethod}
        onValueChange={(value) => updateForm({ verMethod: value })
      }>
        <Picker.Item label="Verification Method" value={undefined} />
      
        {VERIFICATION_METHODS.map(method => (
          <Picker.Item
            key={method.value}
            label={method.label}
            value={method.value}
          />
        ))}
      </Picker>

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