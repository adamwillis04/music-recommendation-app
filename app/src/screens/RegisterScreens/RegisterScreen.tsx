import React, { useState } from "react"
import { View, Button, Alert, StyleSheet, TouchableOpacity, Text } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../navigation/AuthNavigator"
import { useAuth } from "../../contexts/AuthContext"
import RegisterNavigator from "./RegisterNavigator"
import { useRegister } from "../../contexts/RegisterContext"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../services/config"
import Header, { HEADER_HEIGHT } from "../../components/Header"
import { colors } from "../../styles/colors"

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

export default function RegisterScreen({ navigation }: Props) {
  const { signUp } = useAuth()
  const { form } = useRegister()
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {

    if (form.role==="fan" && (!form.username) ) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    if (form.role==="artist" && (!form.artist || !form.verMethod) ) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    if (form.role==="venue" && (!form.venue || !form.venueAdd || !form.verMethod) ) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    try {
      setLoading(true)
      const user = await signUp(form.email, form.password)
      const userID = user.uid

      await setDoc(doc(db, "users", userID), {
        userID,
        role: form.role,
        email: form.email,
        createdAt: serverTimestamp(),

        //Fan
        username: form.username ?? null,
        artistCode: form.artistCode ?? null,
        
        //Artist
        artist: form.artist?.name ?? null,
        mbid: form.artist?.mbid ?? null,

        //Venue
        venue: form.venue ?? null,
        venueAdd: form.venueAdd ?? null,

        //Verification
        verMethod: form.verMethod ?? null,
        verStatus: (form.role === "artist" || form.role === "venue") ? false : null,
      })
    } catch (error: any) {
      Alert.alert("Registration failed", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Register"
        onBack={() => navigation.navigate("Landing")}
      />

      <RegisterNavigator />

      <TouchableOpacity onPress={handleRegister} style={styles.button} >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: HEADER_HEIGHT,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    marginHorizontal: 24,
    marginVertical: 36
  },
  buttonText: { fontSize: 20, fontWeight: "500", color: colors.white, textAlign: "center", }, 
})