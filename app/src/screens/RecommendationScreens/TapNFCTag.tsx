import { httpsCallable } from "firebase/functions";
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import NfcManager, { Ndef, NfcTech, TagEvent } from "react-native-nfc-manager";
import { functions } from "../../services/config";
import { FanStackParamList } from "../../navigation/FanNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Artist } from "../../types/artist";
import { colors } from "../../styles/colors";
import { RefreshCcw } from "lucide-react-native";

NfcManager.start();

export default function TapNFCTag() {
  const [token, setToken] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const claimMerchandiseCallable = httpsCallable(functions, "claimMerchandise");
  const navigation = useNavigation<NativeStackNavigationProp<FanStackParamList>>()

  const startScan = async () => {
    try {
      setScanning(true);
      setToken(null);

      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      
      setLoading(true)
      if (tag?.ndefMessage?.length) {
        const decodedTexts = tag.ndefMessage
          .map(record => {
            if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return Ndef.text.decodePayload(Uint8Array.from (record.payload as number[]));
            }
            return null;
          })
          .filter(Boolean);
        const nfcToken = decodedTexts.join("\n");
        setToken(nfcToken);
        
        const result = await claimMerchandiseCallable({
          token: nfcToken,
        });
  
        const {artistObj} = result.data as {artistObj: Artist};
        navigation.navigate("FanArtist", {artist: artistObj})
      } 
    } catch (error) {
      console.warn("NFC scan failed", error);
    } finally {
      setScanning(false);
      NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  useEffect(() => {
    startScan();
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.container}>

      {scanning && 
        <Text style={styles.instruction}>Scanning for NFC tags...</Text>
      }

      {!scanning && (
        <TouchableOpacity
          onPress={startScan} 
          style={styles.button} 
        >
          <View style={styles.buttonContent}>
            <RefreshCcw size={30} color={colors.white} />
            <Text style={styles.buttonText}>Retry</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20},
  instruction: { fontSize: 20, fontWeight: "500", textAlign: "center" },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: "500", 
    color: colors.white, 
    textAlign: "center",
    justifyContent: "space-between" 
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 8
  },
});