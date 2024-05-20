import { View, Platform, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Easplit</Text>
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
