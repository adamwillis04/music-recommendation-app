import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { View } from "react-native";
import Header, { HEADER_HEIGHT } from "../../components/Header";
import { StyleSheet } from "react-native";
import RecommendationScreenNavigator from "./RecommendationScreenNavigator";

type Props = NativeStackScreenProps<FanStackParamList, "Recommendations">

export default function RecommendationScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Header
        title="Recommendations"
        onBack={() => navigation.goBack()}
        onProfile={() => navigation.navigate("FanProfile")}
      />

      <RecommendationScreenNavigator route={route}/>
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