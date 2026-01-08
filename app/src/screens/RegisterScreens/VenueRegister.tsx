import React, { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { TextInput, StyleSheet } from "react-native"
import { useRegister } from "../../contexts/RegisterContext"
import VerMethodPicker from "../../components/VerMethodPicker"
import { colors } from "../../styles/colors"

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
        placeholder="Venue Name *"
        placeholderTextColor={colors.black}
        value={form.venue}
        onChangeText={venue => updateForm({ venue })}
        style={[styles.input, {marginTop: 20}]}
      />

      <TextInput
        placeholder="Venue Address *"
        placeholderTextColor={colors.black}
        value={form.venueAdd}
        onChangeText={venueAdd => updateForm({ venueAdd })}
        style={styles.input}
      />

      <VerMethodPicker 
        verMethod={ form.verMethod ?? null}
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