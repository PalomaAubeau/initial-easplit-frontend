import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function EventScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.newEventContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Events")}
      >
        <Text style={styles.textAddingContainer}>
          Retour liste User Events pour tester
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  newEventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textAddingContainer: {
    color: "#EB1194",
    fontWeight: "bold",
  },
});
