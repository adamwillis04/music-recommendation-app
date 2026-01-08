import React from "react"
import { View, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"
import Header, { HEADER_HEIGHT } from "../../components/Header"
import ScanFAB from "../../components/ScanFAB"
import FanHomeNavigator from "./FanHomeNavigator"

type Props = NativeStackScreenProps<FanStackParamList, "FanHome">

// handleArtistCode (if there is one) (remove to null once used)
export default function FanHomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Header
        title="MusicShare"
        onProfile={() => navigation.navigate("FanProfile")}
      />

      <FanHomeNavigator />

      <ScanFAB
        onPress={() => 
          navigation.navigate(
            "Recommendations",
            {initialTab: "Scan"}
          )}
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