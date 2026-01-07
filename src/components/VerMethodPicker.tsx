import { useState } from "react"
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native"
import { colors } from "../styles/colors"
import { ChevronDown, X } from "lucide-react-native"
import { VERIFICATION_METHODS, VerificationMethod } from "../types/verification"

interface Props {
  verMethod?: VerificationMethod | null
  onSelect: (verMethod?: VerificationMethod) => void
}

export default function VerMethodPicker({ verMethod, onSelect }: Props) {
  const [showDropdown, setShowDropdown] = useState(false) 

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowDropdown(prev => !prev)}
      >
        <TextInput
          placeholder="Choose Verification Method *"
          value={VERIFICATION_METHODS.find(method => method.value === verMethod)?.label ?? ""}
          editable={false}
          pointerEvents="none"
          style={styles.input}
        />
      </TouchableOpacity>

      {verMethod ? (
      <TouchableOpacity
          onPress={() => {
            onSelect(undefined)
          }}
          style={styles.clearButton}>
          <X size={30} color={colors.black} />
      </TouchableOpacity>
      ) : (
      <TouchableOpacity
          onPress={() => {
            setShowDropdown(true)
          }}
          style={styles.clearButton}>
          <ChevronDown size={30} color={colors.black} />
      </TouchableOpacity>
      )}

      {(!verMethod && showDropdown) && (
        <View style={styles.dropdown}>
          <FlatList
            data={VERIFICATION_METHODS}
            keyExtractor={item => item.value}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item.value)
                  setShowDropdown(false)
                }}
                style={styles.item}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    padding: 10,
  },
  input: {
    height: 60,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingLeft: 10,
    fontSize: 18
  },
  clearButton: {
    position: "absolute",
    right: 25,
    top: 25,
    zIndex: 2,
  },
  dropdown: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    zIndex: 10, 
    maxHeight: 200, 
  },
  item: {
    padding: 10,
  },
});