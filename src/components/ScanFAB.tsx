import { QrCode } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";
import { StyleSheet } from "react-native";

type Props = { onPress: () => void }

export default function ScanFAB({ onPress }: Props) {
    return (    
        <TouchableOpacity onPress={onPress} style={styles.fab}>
            <QrCode size={40} color={colors.white} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.primary,
    elevation: 6,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
})