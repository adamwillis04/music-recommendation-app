import React, { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { TextInput, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useRegister } from "../../contexts/RegisterContext"
import { VERIFICATION_METHODS } from "../../types/verification"

export default function VenueRegister() {
  const { form, updateForm } = useRegister()

  useFocusEffect(
    useCallback(() => {
      updateForm({ role: "venue" }) 
    }, [])
  )

  return (
    <>
      <TextInput
        placeholder="Venue Name"
        value={form.venue}
        onChangeText={venue => updateForm({ venue })}
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