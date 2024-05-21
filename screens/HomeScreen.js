import { View, Platform, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { updateFirstName } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.firstname}>Bonjour {user.firstName} </Text>

      <View style={styles.solde}>
        <Text style={styles.balance}>Mon solde</Text>
      </View>
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

  firstname: {
    fontSize: 25,
    marginLeft: 25,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  solde: {},

  balance: {},
});
