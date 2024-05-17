import { View, Platform, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Easplit</Text>
    </View>
  );
}
