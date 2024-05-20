import {
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../reducers/user";

const PATH = "http://192.168.1.21:8081";
// const PATH = "https://easplit-backend.vercel.app"
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LogScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  //2.Comportements
  const handleRegister = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));

      fetch(`${PATH}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.result &&
            dispatch(
              login({
                token: data.token,
                firstName: data.firstName,
                email: data.email,
              })
            );
          if (user.token) {
            navigation.navigate("TabNavigator", { screen: "EventHomeScreen" });
          }
        });
    } else {
      setEmailError(true);
    }
  };

  //3.RETURN FINAL
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Easplit</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="prénom"
          onChangeText={(value) => setFirstName(value)}
          value={firstName}
          style={styles.input}
        />
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
        />
        {emailError && (
          <Text style={styles.error}>
            Le format de l'adresse email est incorrect
          </Text>
        )}
        <TextInput
          placeholder="mot de passe"
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
          value={password}
          style={styles.input}
        />
        <Text>Pas encore de compte?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "SignUpScreen" })
          }
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRegister()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>C'est parti!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(	255, 190, 11, 0.4)",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "Futura",
    marginBottom: 20,
  },
  inputContainer: {
    width: "85%",
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 1,
  },
  input: {
    width: "100%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
    marginTop: 30,
    backgroundColor: "#fbe29c",
    borderRadius: 1,
  },
  textButton: {
    fontFamily: "Futura",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
