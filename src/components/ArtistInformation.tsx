import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Heart, Verified } from "lucide-react-native"
import { colors } from "../styles/colors"
import { Artist } from "../types/artist"
import { Profile } from "../types/profile"
import { useProfile } from "../contexts/ProfileContext"

type Props = { 
  artist: Artist
}

export default function ArtistInformation({ artist }: Props) {
  const { likedArtists, like, unlike} = useProfile()
  const liked = likedArtists.has(artist.mbid)

  //get tags from search (top 3)
  return (
    <View style={styles.container}>

      <View style={styles.verifiedIcon}>
        {artist.verified && (
          <Verified
            size={30}
            color={colors.primary}
          />
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.2}
        >
          {artist.name}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => (liked ? unlike(artist.mbid) : like(artist.mbid))}
        style={styles.rightButton}
      >
        <Heart
          size={30}
          color={colors.primary}
          fill={liked ? colors.primary : "none"}
        />
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10
    },
    verifiedIcon: { width: 40, alignItems: "flex-start" },
    titleContainer: { flex: 1, alignItems: "center", justifyContent: "center"},
    title: { fontSize: 30, fontWeight: "700" },
    rightButton: { width: 40, alignItems: "flex-end" },
})