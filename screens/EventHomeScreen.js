import { View, Platform, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";

export default function EventHomeScreen({ navigation }) {
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Event</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});