import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ChevronLeft, User } from "lucide-react-native"
import { colors } from "../styles/colors"

type Props = { 
  title: string 
  onBack?: () => void
  onProfile?: () => void
}

export default function Header({ title, onBack, onProfile }: Props) {
  return (
    <View style={styles.container}>
      
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.leftButton}>
          <ChevronLeft size={30} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}

      <Text style={styles.title}>{title}</Text>

      {onProfile ? (
        <TouchableOpacity onPress={onProfile} style={styles.rightButton}>
          <User size={30} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} /> 
      )}
      
    </View>
  )
}

export const HEADER_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    position: "absolute",       
    top: 0,                      
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 45,
    backgroundColor: colors.primary,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  leftButton: { width: 40, alignItems: "flex-start" },
  title: { fontSize: 30, fontWeight: "700", color: colors.white },
  rightButton: { width: 40, alignItems: "flex-end" },
})
