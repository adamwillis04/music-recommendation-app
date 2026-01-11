import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useProfile } from "../../contexts/ProfileContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/config";
import { Artist } from "../../types/artist";
import { useNavigation } from "@react-navigation/native";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForegroundPermissions } from "expo-location"
import { colors } from "../../styles/colors";

export default function ScanQRCode() {
  const [camStatus, requestCamPermission] = useCameraPermissions();
  const [locStatus, requestLocPermission] = useForegroundPermissions();
  const [scanned, setScanned] = useState(false);
  const { getCurrentLocation } = useProfile()
  const completeInteractionCallable = httpsCallable(functions, "completeInteraction");
  const navigation = useNavigation<NativeStackNavigationProp<FanStackParamList>>()

  useEffect(() => {
    const getPermissions = async () => {
      await requestLocPermission();
      await requestCamPermission();
    } 
    
    getPermissions()
  }, []);

  const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
    setScanned(true)
    const token = scanningResult.data
    const loc = await getCurrentLocation();

    if (!token || !loc) {
      console.error("Missing token or location data.")
      setScanned(false)
      return;
    }

    try {
      const result = await completeInteractionCallable({
        token: token,
        loc: loc,
      });

      const {artistObj} = result.data as {artistObj: Artist};
      navigation.navigate("FanArtist", {artist: artistObj})
    } catch (error: any) {
      console.error("Error completing interaction:", error.code, error.message);
      setScanned(false);
    }
  };

  if (!camStatus || !locStatus || !camStatus.granted || !locStatus.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Location and Camera permissions needed.</Text>
      </View>
    );
  }
  
  if (scanned) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={{flex:1}}>
      {!scanned && (
        <CameraView
          style={{flex:1}}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      )}
    </View>
  );
}