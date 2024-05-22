import { StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
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
import React, { useState, useEffect } from "react";
import { loadEvents } from "../reducers/user";

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
        style={[
          styles.eventContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        key={i}
        onPress={() => navigation.navigate("Event")}
      >
        <Text style={styles.textCurrentEventContainer}>{data.name}</Text>
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
        {/* <Icon name="menu" size={35} color="#4E3CBB" /> */}
        <DropdownMenu />
      </View>
      <MaskedView
        style={{ flexDirection: "row" }}
        maskElement={
          <Text style={styles.titleText}>Bonjour {user.firstName}</Text>
        }
      >
        <LinearGradient
          colors={["#EB1194", "#4E3CBB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        />
      </MaskedView>
      <Text
        style={[styles.margin, globalStyles.inputLabel, globalStyles.capital]}
      >
        MES ÉVÈNEMENTS
      </Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {user.events.length === 0 ? (
          <Text style={styles.message}>
            Aucun évènement à afficher pour le moment
          </Text>
        ) : (
          <>{userEvents}</>
        )}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.newEventContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={styles.textAddingContainer}>Ajouter un évènement</Text>
        <Icon name="add-circle" size={30} color="#EB1194"></Icon>
      </TouchableOpacity>
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
    marginTop: 10,
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
    //fontFamily: "CodecPro-ExtraBold",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    // marginBottom: 40,
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
    fontFamily: "CodecPro-Heavy",
    color: "#EB1194",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
