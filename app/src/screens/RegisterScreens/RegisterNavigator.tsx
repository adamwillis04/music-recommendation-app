import { StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FanRegister from "./FanRegister"
import ArtistRegister from "./ArtistRegister"
import VenueRegister from "./VenueRegister"
import { colors } from "../../styles/colors"

const Tab = createMaterialTopTabNavigator()

export default function RegisterNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabItem,
      tabBarLabelStyle: styles.label,
      tabBarIndicatorStyle: styles.indicator
    }}>
      <Tab.Screen name="Fan" component={FanRegister} />
      <Tab.Screen name="Artist" component={ArtistRegister} />
      <Tab.Screen name="Venue" component={VenueRegister} />
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