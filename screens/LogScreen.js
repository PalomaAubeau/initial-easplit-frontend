import { View, Platform, Text } from "react-native";
import { StyleSheet } from "react-native";

// Déclarations des variables globales:
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LogScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  //2.Comportements
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate("TabNavigator", { screen: "Gallery" });
    } else {
      setEmailError(true);
    }
  };

  //3.RETURN FINAL
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
