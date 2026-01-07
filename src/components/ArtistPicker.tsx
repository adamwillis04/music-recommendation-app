import { useEffect, useState } from "react"
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "../services/config"
import { Artist } from "../types/artist"
import { colors } from "../styles/colors"
import { X } from "lucide-react-native"

interface Props {
  artist?: Artist | null
  onSelect: (artist?: Artist) => void
  showVerified: boolean
}

export default function ArtistPicker({ artist, onSelect, showVerified }: Props) {
  const [searchStr, setSearchStr] = useState("")
  const [results, setResults] = useState<Artist[]>([])

  useEffect(() => {
    const search = async () => {
      if (searchStr.length<1) {
        setResults([])
        return
      }

      const q = query(
        collection(db, "artists"),
        where("name", ">=", searchStr),
        where("name", "<=", searchStr + "\uf8ff"),
        limit(10)
      )

      const results = await getDocs(q)

      var artists = results.docs.map(doc => ({
        mbid: doc.id,
        ...(doc.data() as Omit<Artist, "mbid">),
      }))

      if (!showVerified) artists = artists.filter(artist => !artist.verified) 
      setResults(artists)
    }

    search()
  }, [searchStr])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Artists"
        value={searchStr}
        onChangeText={text => {setSearchStr(text)}}
        style={styles.input}
      />

      {artist && (
      <TouchableOpacity
          onPress={() => {
            setSearchStr("")
            onSelect(undefined)
          }}
          style={styles.clearButton}>
          <X size={30} color={colors.black} />
      </TouchableOpacity>
      )}

      {!artist && results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            keyExtractor={item => item.mbid}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item)
                  setSearchStr(item.name)
                  setResults([])
                }}
                style={styles.item}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    padding: 10,
  },
  input: {
    height: 60,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingLeft: 10,
    fontSize: 18
  },
  clearButton: {
    position: "absolute",
    right: 25,
    top: 25,
    zIndex: 2,
  },
  dropdown: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    zIndex: 10, 
    maxHeight: 200, 
  },
  item: {
    padding: 10,
  },
});