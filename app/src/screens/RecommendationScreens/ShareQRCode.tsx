import { Text, View, Button } from "react-native";
import { Artist } from "../../types/artist";
import { useProfile } from "../../contexts/ProfileContext";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/config";
import QRCode from "react-native-qrcode-svg"
import { colors } from "../../styles/colors";

type Props = {
  artist?: Artist | undefined;
};
//Handle location not being provided (permission stuff)
export default function ShareQRCode({ artist }: Props) {
  const { getCurrentLocation } = useProfile();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const createInteractionCallable = httpsCallable(functions, "createInteraction");

  const handleGenerateToken = async () => {
    setLoading(true);
    const loc = await getCurrentLocation();
    if (!artist || !loc) return;
    
    try {
      const result = await createInteractionCallable({
        mbid: artist.mbid,
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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        {artist?.name ?? "No artist selected"}
      </Text>

      <Button
        title={loading ? "Generating..." : "Generate QR Token"}
        onPress={handleGenerateToken}
        disabled={loading || !artist}
      />

      {token && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <QRCode 
            value={token} 
            size={250}
            color={colors.primary}
          />
        </View>
      )}
    </View>
  );
}