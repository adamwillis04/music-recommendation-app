import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Artist } from "../../types/artist";
import { useProfile } from "../../contexts/ProfileContext";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/config";
import QRCode from "react-native-qrcode-svg"
import { colors } from "../../styles/colors";
import ArtistPicker from "../../components/ArtistPicker";
import { useForegroundPermissions } from "expo-location";

type Props = {
  artist?: Artist | undefined;
};

export default function ShareQRCode({ artist }: Props) {
  const [locStatus, requestLocPermission] = useForegroundPermissions()
  const [artistRec, setArtistRec] = useState(artist);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const TTL = 30
  const [expiry, setExpiry] = useState<number | null>(null);
  const { getCurrentLocation } = useProfile();
  const createInteractionCallable = httpsCallable(functions, "createInteraction");

  useEffect(() => {
    const getPermissions = async () => {
      await requestLocPermission();
    } 
    
    getPermissions()
  }, []);

  useEffect(() => {
    if (!token) {
      setExpiry(null);
      return;
    }

    setExpiry(TTL);
    const interval = setInterval(() => {
      setExpiry(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setToken(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  const handleGenerateToken = async () => {
    setLoading(true);
    const loc = await getCurrentLocation();

    if (!artistRec || !loc) {
      console.error("Missing artist recommendation or location data.")
      setLoading(false)
      return;
    }
    
    try {
      const result = await createInteractionCallable({
        mbid: artistRec.mbid,
        loc: loc,
      });

      const jwtToken = result.data as string;
      setToken(jwtToken);
    } catch (error: any) {
      console.error("Error calling function:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!locStatus || !locStatus.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Location permissions needed.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
  
  if (token) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={styles.qrContainer}>
          <Text style={[styles.buttonText, {paddingBottom: 10}]}>{artistRec!.name}</Text>
          <QRCode 
            value={token} 
            size={300}
            color={colors.white}
            backgroundColor={colors.primary}
            />
        </View>

        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 500, textAlign: "center" }}>
          Expires in {expiry}s
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ArtistPicker 
        artist={artistRec ?? null}
        onSelect={setArtistRec}
        showVerified={true}
        isSearch={false}
        placeholder="Choose an artist..."
      />

      <View style={styles.divider} />

      <TouchableOpacity 
        onPress={handleGenerateToken}
        disabled={!artistRec} 
        style={[styles.button, !artistRec && styles.buttonDisabled]} 
      >
        {(!artistRec) ? (
          <Text style={styles.buttonText}>{"Choose an artist"}</Text>
        ) : (
          <Text style={styles.buttonText}>{"Recommend "+artistRec.name}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    margin: 10
  },
  buttonDisabled: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    margin: 10
  },
  buttonText: { fontSize: 20, fontWeight: "500", color: colors.white, textAlign: "center", },
  divider: { height: 3, backgroundColor: colors.primary, marginVertical: 10, marginHorizontal: 10},
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: colors.primary,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})