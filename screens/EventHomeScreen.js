import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
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
  const [newEvent, setNewEvent] = useState("");

  //le back renvoie un tableau d'objet comme celui-ci
  const mockUpRepBackEvents = [
    {
      __v: 7,
      _id: "664caee366f7e725eb4e8820",
      description: "final foot JO",
      eventDate: "2024-05-30T00:00:00.000Z",
      guests: [[Object], [Object], [Object], [Object]],
      name: "JO",
      organizer: "664cac72a1ac241f7accda7e",
      paymentDate: "2024-05-29T00:00:00.000Z",
      shareAmount: 5,
      totalSum: 0,
      transactions: [],
    },
  ];
  // Récupération de tous les events liés à l'user
  useEffect(() => {
    fetch(`${PATH}/events/userevents/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadEvents(data.events));
      });
  }, []);
  // .map sur la BDD pour faire une copie du tableau d'objets récupéré et afficher un composant
  const userEvents = user.events.map((data, i) => {
    return (
      <TouchableOpacity
        style={styles.eventContainer}
        key={i}
        onPress={() => navigation.navigate("Event")}
      >
        <Text style={styles.textCurrentContainer}>{data.name}</Text>
      </TouchableOpacity>
    );
  });

  //3.RETURN FINAL
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
        <Icon name="menu" size={35} color="#4E3CBB" />
      </View>
      <Text style={styles.title}>Bonjour {user.firstName}</Text>
      <Text style={styles.titleList}>MES ÉVÈNEMENTS</Text>
      <ScrollView style={styles.scrollView}>
        {user.events.length === 0 ? (
          <Text style={styles.message}>
            Aucun évènement à afficher pour le moment
          </Text>
        ) : (
          <>{userEvents}</>
        )}
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
    marginBottom: 10,
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
  message: {
    color: "#EB1194",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
