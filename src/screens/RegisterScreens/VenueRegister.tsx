import React, { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { TextInput, StyleSheet } from "react-native"
import { useRegister } from "../../contexts/RegisterContext"
import VerMethodPicker from "../../components/VerMethodPicker"

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

      <TextInput
        placeholder="Venue Address"
        value={form.venueAdd}
        onChangeText={venueAdd => updateForm({ venueAdd })}
      />

      <VerMethodPicker 
        verMethod={ form.verMethod ?? null}
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