import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { StyleSheet, Text, View } from "react-native";
import Header, { HEADER_HEIGHT } from "../../components/Header";
import ScanFAB from "../../components/ScanFAB";
import ArtistInformation from "../../components/ArtistInformation";
import { useProfile } from "../../contexts/ProfileContext";
import RewardStatus from "../../components/RewardStatus";

type Props = NativeStackScreenProps<FanStackParamList, "FanArtist">

// Get rewards item that takes mbid, display in the component 
// If nothing - just pass 0 to the component, should handle gracefully
export default function FanArtistScreen({ navigation, route }: Props) {
    const { artist } = route.params
    const { profile } = useProfile()

    return (
        <View style={styles.container}>
            <Header
                title="MusicShare"
                onBack={() => navigation.navigate("FanHome")}
                onProfile={() => navigation.navigate("FanProfile")}
            />

            { artist && profile &&
                <ArtistInformation 
                    artist={artist}
                />
            }

            { artist && profile && 
                <RewardStatus 
                    artist={artist}
                />
            }
                
            <Text>Data and Visualisations</Text>

            <ScanFAB 
                onPress={
                    () => navigation.navigate(
                        "Recommendations", 
                        {initialTab: "Share", artist: artist}
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_HEIGHT*2,
  },
})