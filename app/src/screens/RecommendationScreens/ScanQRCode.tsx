import { useState } from "react";
import { View, Text, Button, } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useProfile } from "../../contexts/ProfileContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/config";
import { Artist } from "../../types/artist";
import { useNavigation } from "@react-navigation/native";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ScanQRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const {getCurrentLocation} = useProfile()
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const completeInteractionCallable = httpsCallable(functions, "completeInteraction");
  const navigation = useNavigation<NativeStackNavigationProp<FanStackParamList>>()

  const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
    setLoading(true)
    setScanned(true)
    const token = scanningResult.data
    const loc = await getCurrentLocation()

    if (!token || !loc) return;

    try {
      const result = await completeInteractionCallable({
        token: token,
        loc: loc,
      });

      const {artistObj} = result.data as {artistObj: Artist};
      navigation.navigate("FanArtist", {artist: artistObj})
    } catch (error: any) {
      console.error("Error calling function:", error.code, error.message);
      setScanned(false)
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return(
      <Text>Asking Permission...</Text>
    )
  }

  if (!permission.granted) {
    return (
      <View style={{flex:1}}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      {!scanned && !loading && (
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