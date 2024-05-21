import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadEvents } from "../reducers/user";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

//const PATH = "http://192.168.1.21:8081";
//const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";

export default function EventHomeScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  //console.log(user);
  //2.Comportements
  // router.get("/userevents/:token", (req, res) => {
  //   User.findOne({ token: req.params.token })
  //     .populate("events")
  //     .then((user) => {
  //       if (!user) {
  //         res.json({ result: false, error: "User not found" });
  //         return;
  //       }
  //       res.json({ result: true, events: user.events });
  //     });
  // });

  useEffect(() => {
    fetch(`${PATH}/userevents/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "test pour voir si la route d'affichage des events de l'user est bien appelée"
        );
        data.result && console.log(data.events);
      });
  }, []);

  //3.RETURN FINAL
  return (
    <LinearGradient
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        <Icon name="menu" size={35} color="#4E3CBB" />
      </View>
      <Text style={styles.title}>Bonjour {user.firstName}</Text>
      <Text style={styles.titleList}>MES ÉVÈNEMENTS</Text>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.eventContainer}>
          <Text style={styles.textCurrentContainer}>Nom de l'évènement</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.newEventContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={styles.textAddingContainer}>Ajouter un évènement</Text>
        <Icon name="add-circle" size={35} color="#EB1194"></Icon>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  titleList: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4E3CBB",
  },
  scrollView: {},
  eventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    color: "#4E3CBB",
  },
  newEventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textCurrentContainer: {
    color: "#4E3CBB",
    fontWeight: "bold",
  },
  textAddingContainer: {
    color: "#EB1194",
    fontWeight: "bold",
  },
  logo: {
    flex: 0.18,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    marginBottom: 70,
  },
});
