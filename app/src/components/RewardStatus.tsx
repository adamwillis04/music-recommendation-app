import { StyleSheet, Text, View } from "react-native"
import { Artist } from "../types/artist"
import { useProfile } from "../contexts/ProfileContext"
import { useState } from "react"
import { colors } from "../styles/colors"
import { HEADER_HEIGHT } from "./Header"

type Props = { 
  artist: Artist
}

export default function RewardStatus({ artist }: Props) {
    const { rewards } = useProfile()
    const [status, setStatus] = useState(rewards.find(r => r.mbid == artist.mbid)?.status)
    const lowerBound = Math.floor( (status ?? 0) / 100) * 100
    const upperBound = lowerBound+100 
    const progress = ((status ?? 0) - lowerBound)
    
  return (
    <View style={styles.container}>
      <View style={styles.barRow}>
        <Text style={styles.boundText}>{lowerBound}</Text>

        <View style={styles.barContainer}>
          <View style={[styles.barFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.boundText}>{upperBound}</Text>
      </View>

      <Text style={styles.statusText}>Artist Level: {status ?? "N/A"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    marginVertical: 10,
    padding: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  boundText: {
    fontSize: 16,
    color: colors.black,
    width: 40,
    textAlign: "center",
  },
  barContainer: {
    flex: 1,
    height: 16,
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: colors.primary,
    borderWidth: 1
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
});