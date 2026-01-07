import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { StyleSheet, Text, View } from "react-native";
import Header, { HEADER_HEIGHT } from "../../components/Header";
import ScanFAB from "../../components/ScanFAB";
import ArtistInformation from "../../components/ArtistInformation";
import { useProfile } from "../../contexts/ProfileContext";

type Props = NativeStackScreenProps<FanStackParamList, "FanArtist">

export default function FanArtistScreen({ navigation, route }: Props) {
    const { artist } = route.params
    const { profile } = useProfile()

    return (
        <View style={styles.container}>
            <Header 
                title=""
                onBack={() => navigation.navigate("FanHome")}
                onProfile={() => navigation.navigate("FanProfile")}
            />

            { artist && profile &&
                <ArtistInformation 
                    artist={artist}
                />
            }

            <Text>Reward System</Text>
            <Text>Data and Visualisations</Text>

            <ScanFAB 
                onPress={() => navigation.navigate("Scan")}
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