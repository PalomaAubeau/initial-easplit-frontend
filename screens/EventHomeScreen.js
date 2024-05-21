import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
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
  //2.Comportements
  //récupération de tous les events liés au compte de l'utilisateur via son token
  useEffect(() => {
    if (!user.token) {
      return;
    }
    fetch(`${PATH}/userevents/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result && dispatch(loadEvents(data.events));
      });
  }, []);

  //3.RETURN FINAL
  return (
    <LinearGradient
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text>easplitLogo</Text>
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
        onPress={() => navigation.navigate("EventCreateEvent")}
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
    //backgroundColor: "",
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 30,
  },
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    //backgroundColor: "",
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
});

