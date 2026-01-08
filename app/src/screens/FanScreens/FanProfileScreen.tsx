import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"
import { useProfile } from "../../contexts/ProfileContext"
import Header from "../../components/Header"
import { useAuth } from "../../contexts/AuthContext"
import { HEADER_HEIGHT } from "../../components/Header"
import { colors } from "../../styles/colors"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/config"

type Props = NativeStackScreenProps<FanStackParamList, "FanProfile">

export default function FanProfileScreen({ navigation }: Props) {
  const { profile, updateProfile } = useProfile()
  const { currentUser, logout } = useAuth()
  const [username, setUsername] = useState("")

  const handleSave = async () => {
    if (!currentUser) return

    if (!username) {
      Alert.alert("Error", "Please enter a username")
      return
    }

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        username: username
      });
      updateProfile({ username: username })
      setUsername("")
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        onBack={() => navigation.goBack()}
        onProfile={() => navigation.navigate("FanProfile")}
      />
      
      <View>
        <View style={styles.info}>
          <Text style={styles.infotext}>{profile?.username}</Text>
          <Text style={styles.infotext}>{profile?.email}</Text>
          <Text style={styles.infotext}>{profile?.userID}</Text>
        </View>

        <TextInput
          placeholder="New Username"
          placeholderTextColor={colors.black}
          autoCapitalize="none"
          value={username ?? undefined}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>

      <View>
        <View style={styles.row}>        
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonRow} >
            <Text style={styles.buttonRowText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.buttonRow} >
            <Text style={styles.buttonRowText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity onPress={logout} style={styles.button} >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    paddingBottom: 30,
    paddingTop: HEADER_HEIGHT+10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    margin: 10
  },
  buttonRow: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    margin: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  buttonText: { fontSize: 20, fontWeight: "500", color: colors.white, textAlign: "center", },
  buttonRowText: { fontSize: 20, fontWeight: "500", color: colors.primary, textAlign: "center", },
  divider: { height: 3, backgroundColor: colors.primary, margin: 10},
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
  info: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white
  },
  infotext: { fontSize: 18, color: colors.black, textAlign: "left", } 
})