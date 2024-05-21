import {
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";
import React, { useState } from "react";

//Import de Linear-Gradient pour le dégradé
import { LinearGradient } from "expo-linear-gradient";

//const PATH = "http://192.168.1.21:8081";
//const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";

export default function LogScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  //2.Comportements
  const handleRegister = () => {
    fetch(`${PATH}/users/login`, {
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
              firstName: data.firstName,
              password: data.password,
            })
          );
          
          navigation.navigate("TabNavigator", {
            screen: "EventHomeScreen",
          });
        }
      });
  };

  //3.RETURN FINAL
  return (
    // composant linear gradient qui permet d'avoir le fond en dégradé : doit tout envelopper
    <LinearGradient
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image
          source={require("../assets/EASPLIT-NOIR.png")}
          style={styles.logo}
        />
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
          <TextInput
            placeholder="mot de passe"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true} // Masque le texte d'entrée
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => handleRegister()}
            style={styles.buttonContainer}
            activeOpacity={0.8}
          >
              <LinearGradient
                colors={["#EB1194", "#4E3CBB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>C'est parti !</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

          {loginErrorMessage && (
            <Text style={styles.error}>{loginErrorMessage}</Text>
          )}
          <Text style={styles.noaccount}>Pas encore de compte?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.buttonContainer}
            activeOpacity={0.8}
          >
              <LinearGradient
                colors={["#EB1194", "#4E3CBB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>Créer un compte</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // style du bouton :
  buttonContainer: {
    display: "flex",
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'CodecPro-ExtraBold',
    // fontWeight:"600",
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  // fin du style du bouton
  logo: {
    flex: 0.18,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    marginBottom: 70,
  },

  inputContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 10,
  },

  input: {
    width: 180,
    borderBottomColor: "#b5B5B5",
    borderBottomWidth: 1,
    marginBottom:20,
    fontSize: 16,
  },

  textButton: {
    fontFamily: "CodecPro-Regular",
    height: 30,
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  noaccount:{
    paddingTop:30,
    paddingBottom:10,
  }
});
