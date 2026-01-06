import { View, Text} from "react-native";
import { StyleSheet } from "react-native";

export default function LikedArtists() {
  return (
    <View style={styles.container}>
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