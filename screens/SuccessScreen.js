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
import globalStyles from "../styles/globalStyles"; //Appel des styles globaux
import React, { useState } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
//Import de Linear-Gradient pour le dégradé
import { LinearGradient } from "expo-linear-gradient";


export default function SuccessScreen({ navigation }) {
  //3.RETURN FINAL
  return (
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
          style={globalStyles.logo}
        />
        <View style={globalStyles.inputContainer}>
          <MaskedView
            style={{ flexDirection: "row" }}
            maskElement={<Text style={styles.titleText}>Félicitation !</Text>}
          >
            <Text style={styles.buttonText}>
              Votre évènement a bien été créé
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EventsListScreen")}
              style={styles.buttonContainer}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#EB1194", "#4E3CBB"]} //Gradient rose vers violet
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>
                    Voir la liste de mes évènements
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <LinearGradient
              colors={["#EB1194", "#4E3CBB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.linearGradient}
            />
          </MaskedView>
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
  title: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "CodecPro-Regular",
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
    fontFamily: "CodecPro-Regular",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  existingAccount: {
    fontFamily: "CodecPro-Regular",
    fontSize: 16,
    paddingTop: 30,
  },
});
