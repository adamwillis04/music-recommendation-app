import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Heart, Verified } from "lucide-react-native"
import { colors } from "../styles/colors"
import { Artist } from "../types/artist"
import { Profile } from "../types/profile"
import { useProfile } from "../contexts/ProfileContext"
import { HEADER_HEIGHT } from "./Header"

type Props = { 
  artist: Artist
}

export default function ArtistInformation({ artist }: Props) {
  const { likedArtists, like, unlike} = useProfile()
  const liked = likedArtists.some(liked => liked.mbid === artist.mbid)
  const infoString = artist.country + " | " + artist.tags.slice(0,3).join(", ")

  return (
    <View style={styles.container}>

      <View style={styles.row}>

        <View style={styles.verifiedIcon}>
          {artist.verified && (<Verified size={30} color={colors.primary}/>)}
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
          onPress={() => (liked ? unlike(artist) : like(artist))}
          style={styles.rightButton}
        >
          <Heart size={30} color={colors.primary} fill={liked ? colors.primary : "none"}/>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text            
            style={styles.infoText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.2}
          >
            {infoString}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: HEADER_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  verifiedIcon: {width: 40, alignItems: "flex-start", },
  rightButton: { width: 40, alignItems: "flex-end", },
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center", },
  title: { fontSize: 30, fontWeight: "700", color: colors.primary, textAlign: "center", },
  infoContainer: { flex: 1, alignItems: "center", },
  infoText: { fontSize: 18, color: colors.primary, fontWeight: "500", textAlign: "center", },
})