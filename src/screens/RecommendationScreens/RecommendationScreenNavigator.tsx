import { StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { colors } from "../../styles/colors"
import ShareQRCode from "./ShareQRCode"
import ScanQRCode from "./ScanQRCode"
import TapNFCTag from "./TapNFCTag"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FanStackParamList } from "../../navigation/FanNavigator"

const Tab = createMaterialTopTabNavigator()
type Props = {
  route: {
    params: FanStackParamList["Recommendations"]
  }
}

export default function RecommendationScreenNavigator({ route }: Props) {
  const { initialTab, artist } = route.params

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabItem,
      tabBarLabelStyle: styles.label,
      tabBarIndicatorStyle: styles.indicator
    }} initialRouteName={initialTab}
    >
      <Tab.Screen name="Share">
        {(props) => <ShareQRCode artist={artist}/>}
      </Tab.Screen>
      <Tab.Screen name="Scan" component={ScanQRCode} />
      <Tab.Screen name="Tap" component={TapNFCTag} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabItem: {
    flex: 1
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  indicator: {
    backgroundColor: colors.primary,
    height: 3,
    borderRadius: 2,
  },
});