import { useEffect, useState } from "react"
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "../services/config"
import { Artist } from "../types/artist"

interface Props {
  artist?: Artist | null
  onSelect: (artist?: Artist) => void
}

export default function ArtistPicker({ artist, onSelect }: Props) {
  const [searchStr, setSearchStr] = useState("")
  const [results, setResults] = useState<Artist[]>([])

  useEffect(() => {
    if (searchStr.length < 2) {
      setResults([])
      return
    }

    const search = async () => {

      const q = query(
        collection(db, "artists"),
        where("name", ">=", searchStr),
        where("name", "<=", searchStr + "\uf8ff"),
        limit(10)
      )

      const results = await getDocs(q)

      const artists = results.docs.map(doc => ({
        mbid: doc.id,
        ...(doc.data() as Omit<Artist, "mbid">),
      }))

      setResults(artists.filter(artist => !artist.verified))
    }

    search()
  }, [searchStr])

  return (
    <View>
      <TextInput
        placeholder="Select Artist"
        value={searchStr}
        onChangeText={text => {
          setSearchStr(text)
        }}/>

      {artist && (
      <TouchableOpacity
          onPress={() => {
          setSearchStr("")
          onSelect(undefined)
          }}
          style={{ position: "absolute", right: 10, top: 12 }}>
          <Text>✕</Text>
      </TouchableOpacity>
      )}

      {!artist && results.length > 0 && (
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
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}