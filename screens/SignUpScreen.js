import {
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../reducers/user";

//const PATH = "http://192.168.1.21:8081";
//const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LogScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isWrongEmailFormat, setIsWrongEmailFormat] = useState(false);
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  //2.Comportements
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(login(email));

      fetch(`${PATH}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            setLoginErrorMessage(data.error);
          } else {
            dispatch(
              login({
                token: data.token,
                email: data.email,
              })
            );
          }
        });
      navigation.navigate("TabNavigator", { screen: "EventHomeScreen" });
    } else {
      setIsWrongEmailFormat(true);
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
          placeholder="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
        />
        {isWrongEmailFormat && (
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
        {loginErrorMessage && (
          <Text style={styles.error}>{loginErrorMessage}</Text>
        )}
        <TouchableOpacity
          onPress={() => handleSubmit()}
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
