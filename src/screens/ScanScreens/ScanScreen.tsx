import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { View } from "react-native";
import Header, { HEADER_HEIGHT } from "../../components/Header";
import { StyleSheet } from "react-native";

type Props = NativeStackScreenProps<FanStackParamList, "Scan">

export default function ScanScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Header
        title="Scan"
        onBack={() => navigation.goBack()}
        onProfile={() => navigation.navigate("FanProfile")}
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