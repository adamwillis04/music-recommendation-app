import { View, Text, FlatList, TouchableOpacity} from "react-native";
import { StyleSheet } from "react-native";
import ArtistPicker from "../../components/ArtistPicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { useProfile } from "../../contexts/ProfileContext";
import { colors } from "../../styles/colors";
import { Heart, Verified } from "lucide-react-native";

export default function LikedArtists() {
  const navigation = useNavigation<NativeStackNavigationProp<FanStackParamList>>()
  const { likedArtists, unlike } = useProfile()

  return (
    <View style={styles.container}>
      <ArtistPicker 
        onSelect={pickedArtist => navigation.navigate("FanArtist", {artist: pickedArtist})}
        showVerified={true}
        isSearch={true}
        placeholder="Search for artists..."
      />

      <View style={styles.divider} />

      <Text style={styles.title}>Favourites</Text>

      <FlatList
        data={likedArtists}
        keyExtractor={item => item.mbid}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("FanArtist", {artist: item})}>
            <View style={styles.row}>

              <View style={styles.verifiedIcon}>
                {item.verified && (<Verified size={20} color={colors.primary}/>)}
              </View>

              <View style={styles.titleContainer}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.2}
                  >
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => (unlike(item))}
                style={styles.rightButton}
                >
                <Heart size={20} color={colors.primary} fill={colors.primary}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
  },
  verifiedIcon: {width: 40, alignItems: "flex-start", },
  rightButton: { width: 40, alignItems: "flex-end", },
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center", },
  title: { fontSize: 20, fontWeight: "500", color: colors.primary, textAlign: "center", },
  divider: { height: 3, backgroundColor: colors.primary, margin: 10, }
})