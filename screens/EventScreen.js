import { StyleSheet } from "react-native";
//import globalStyles from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
//import MaskedView from "@react-native-masked-view/masked-view";
import DropdownMenu from "../components/DropdownMenu";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
//import React, { useState, useEffect } from "react";
//import { useIsFocused } from "@react-navigation/native";

//const PATH = "http://192.168.1.21:8081";
//const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";

export default function EventScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  //const isFocused = useIsFocused();
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.user.value);

  //mockUp de ce que renvoie le back pour avancer en attendant

  //2. Comportements
  //3. RETURN FINAL
  return (
    <LinearGradient
      style={styles.container}
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/EASPLIT-NOIR.png")}
          style={styles.logo}
        />
        <DropdownMenu />
      </View>
      <TouchableOpacity
        style={[
          styles.newEventContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Events")}
      >
        <Text style={styles.textAddingContainer}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.listText}>MES ÉVÈNEMENTS</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.message}>
          Aucun évènement à afficher pour le moment
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 10,
  },
  //MAINS CONTAINERS
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  scrollView: {
    //flex: 0.1,
    //height: 60,
    //backgroundColor: "#4E3CBB",
    marginTop: 20,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  // ELEMENT RAPPORTE
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  // EVENTS CONTAINER
  eventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    color: "#4E3CBB",
    marginBottom: 15,
    height: 60,
  },
  newEventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
    height: 60,
  },
  shadowAndroid: {
    elevation: 6,
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  // TEXTES
  linearGradient: {
    borderRadius: 0,
    height: 40,
    marginTop: 30,
    width: "100%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    //marginBottom: 40,
  },
  listText: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 16,
    marginTop: 30,
  },
  textCurrentEventContainer: {
    fontFamily: "CodecPro-Heavy",
    color: "#4E3CBB",
    fontSize: 16,
  },
  textAddingContainer: {
    fontFamily: "CodecPro-Heavy",
    color: "#EB1194",
    fontSize: 16,
  },
  message: {
    fontFamily: "CodecPro-Regular",
    color: "#EB1194",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
