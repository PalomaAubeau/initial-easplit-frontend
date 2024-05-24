import { useNavigation } from "@react-navigation/native";

export default function EventCard({ event }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.listCard,
        Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
      ]}
      onPress={() => navigation.navigate("Event", { event })}
    >
      <Text style={styles.textEventCard}>{event.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 60,
  },
  shadowAndroid: {
    elevation: 6,
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  textEventCard: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 16,
  },
});
