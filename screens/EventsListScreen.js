import { StyleSheet } from "react-native";
//import globalStyles from "../styles/globalStyles";
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
import { loadEvents } from "../reducers/user";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

//mock
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

// const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";

export default function EventsListScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  //2. Comportements
  // Récupération de tous les events liés à l'user - mise à jour à chaque fois qu'on revient sur le screen
  useFocusEffect(
    useCallback(() => {
      fetch(`${PATH}/events/user-events/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(loadEvents(data.events));
            setEvents(data.events);
          }
        });
    }, [])
  );

  // .map sur la BDD pour faire une copie du tableau d'objets récupéré et afficher un composant
  // Au moment d'appeler la fonction navigate on ajoute en paramètre l'_id de l'event pour pouvoir le récupérer ailleurs
  const userEvents = events.map((data) => {
    return (
      <TouchableOpacity
        style={[
          styles.eventContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        key={data._id}
        onPress={() => navigation.navigate("Event", { eventId: data._id })}
      >
        <Text style={styles.textCurrentEventContainer}>{data.name}</Text>
      </TouchableOpacity>
    );
  });

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
      <Text style={styles.listText}>MES ÉVÈNEMENTS</Text>
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

// Explications du choix de hook:

//Le hook useEffect ne permet pas de recharger à nouveau la page si une invitation est envoyée à l'user alors qu'il est connecté (pas de mise à jour de la page entre les navigations entre les différents écran)

//Le hook useFocusEffect est utilisé pour exécuter des effets secondaires lorsqu'un écran est mis au point et pour les nettoyer lorsqu'il devient flou . D'un autre côté, useIsFocused est un hook qui renvoie simplement un booléen indiquant si l'écran est actuellement focalisé ou non.

//Le hook useCallback est un outil puissant qui peut être utilisé pour améliorer les performances des composants React . En mémorisant les fonctions de rappel, useCallback peut éviter les rendus inutiles, ce qui peut conduire à une expérience utilisateur plus fluide.
