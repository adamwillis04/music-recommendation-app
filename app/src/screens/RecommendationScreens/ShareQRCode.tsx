import { Text, View, Button } from "react-native";
import { Artist } from "../../types/artist";
import { useProfile } from "../../contexts/ProfileContext";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/config";

type Props = {
  artist?: Artist | undefined;
};

export default function ShareQRCode({ artist }: Props) {
  const { profile, getCurrentLocation } = useProfile();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const createInteractionCallable = httpsCallable(functions, "createInteraction");

  const handleGenerateToken = async () => {
    const loc = await getCurrentLocation();
    if (!artist || !loc) return;
    setLoading(true);
    

    try {
      const result = await createInteractionCallable({
        mbid: artist.mbid,
        loc: loc,
      });

      const jwtToken = result.data as string;
      console.log("JWT token:", jwtToken);
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
        <Text style={{ marginTop: 20, color: "green" }}>
          JWT Token: {token}
        </Text>
      )}
    </View>
  );
}