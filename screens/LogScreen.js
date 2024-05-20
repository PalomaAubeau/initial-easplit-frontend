import { View, Platform, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";

export default function LogScreen({ navigation }) {
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Logscreen</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("TabNavigator")}>
        <Text style={styles.text}>Se connecter</Text>
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
