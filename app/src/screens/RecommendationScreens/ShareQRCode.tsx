import { Text, View } from "react-native";
import { Artist } from "../../types/artist";
import { useProfile } from "../../contexts/ProfileContext";
import { useEffect, useState } from "react";

type Props = {
    artist?: Artist | undefined
}

export default function ShareQRCode({ artist }: Props) {
    return(
        <View>
            <Text>{artist?.name ?? "No Artist"}</Text>
        </View>
    )
}