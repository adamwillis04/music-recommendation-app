import React from "react"
import { View, Button, StyleSheet, Text } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"
import { useProfile } from "../../contexts/ProfileContext"
import Header from "../../components/Header"
import { useAuth } from "../../contexts/AuthContext"
import { HEADER_HEIGHT } from "../../components/Header"
import { colors } from "../../styles/colors"
import ScanFAB from "../../components/ScanFAB"

type Props = NativeStackScreenProps<FanStackParamList, "FanProfile">

export default function FanProfileScreen({ navigation }: Props) {
  const { profile } = useProfile()
  const { currentUser, logout } = useAuth()

  //Claim new artist code (no animation just add points?)
  //Change profile / auth fields + save or discard buttons 

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        onBack={() => navigation.goBack()}
        onProfile={() => navigation.navigate("FanProfile")}
      />

      <Text>Artist Code claiming here</Text>

      <Text>Profile + Auth editing here</Text>

      <Button 
        title="Logout"
        onPress={() => logout()}
      />
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
})