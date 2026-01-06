import { StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { colors } from "../../styles/colors"
import LikedArtists from "./LikedArtists"
import LikedVenues from "./LikedVenues"

const Tab = createMaterialTopTabNavigator()

export default function FanHomeNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabItem,
      tabBarLabelStyle: styles.label,
      tabBarIndicatorStyle: styles.indicator
    }}>
      <Tab.Screen name="Liked Artists" component={LikedArtists} />
      <Tab.Screen name="Liked Venues" component={LikedVenues} />
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