import { View, Platform, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function EventHomeScreen({ navigation }) {
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Easplit</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("TabNavigator")}>
        <Text style={styles.text}>Home</Text>
        </Pressable>
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