import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FanRegister from "./FanRegister"
import ArtistRegister from "./ArtistRegister"
import VenueRegister from "./VenueRegister"

const Tab = createMaterialTopTabNavigator()

export default function RegisterNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Fan" component={FanRegister} />
      <Tab.Screen name="Artist" component={ArtistRegister} />
      <Tab.Screen name="Venue" component={VenueRegister} />
    </Tab.Navigator>
  )
}
