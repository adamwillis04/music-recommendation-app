import { View, Text} from "react-native";
import { StyleSheet } from "react-native";
import ArtistPicker from "../../components/ArtistPicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";

export default function LikedArtists() {
  const navigation = useNavigation<NativeStackNavigationProp<FanStackParamList>>()

  return (
    <View>
      <ArtistPicker 
        onSelect={pickedArtist => navigation.navigate("FanArtist", {artist: pickedArtist})}
        showVerified={true}
        isSearch={true}
      />

      <Text>Liked Artists</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  }
})