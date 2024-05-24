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
import { loadEvents } from "../reducers/user";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getUserEvents } from "../utils/getUserEvents"; // import fonction pour le fetch

export default function EventsListScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  //2. Comportements
  // Récupération de tous les évènements avec useEffect (un seul appel) en allant chercher la fonction asynchrone getUserEvents, qu'on déclenche aussitôt avec les () à la fin. Avec isFocused en dépendance, l'appel se fait à chaque fois qu'on revient sur la page.
  useEffect(() => {
    (async () => {
      const events = await getUserEvents(user.token);
      dispatch(loadEvents(events));
      setEvents(events);
    })();
  }, [isFocused]);

  //.map sur la BDD pour faire une copie du tableau d'objets récupéré et afficher un composant
  //Au moment d'appeler la fonction navigate on ajoute en paramètre l'id créé de l'event pour pouvoir le récupérer ailleurs
  const userEvents = events.map((data) => {
    return (
      <TouchableOpacity
        style={[
          { ...styles.listCard, justifyContent: "center" },
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        key={data._id}
        onPress={() => navigation.navigate("Event", { eventId: data._id })}
      >
        <Text style={{ ...styles.textEventCard, color: "#4E3CBB" }}>
          {data.name}
        </Text>
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
      <Text
        style={[
          globalStyles.titleList,
          globalStyles.violet,
          globalStyles.capital,
        ]}
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
          {
            ...styles.listCard,
            justifyContent: "space-between",
            marginBottom: 50,
          },
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={{ ...styles.textEventCard, color: "#EB1194" }}>
          Ajouter un évènement
        </Text>
        <Icon name="add-circle" size={30} color="#EB1194"></Icon>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  //MAINS CONTAINERS
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  scrollView: {
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
  listCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
  },
  textEventCard: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 16,
  },
  message: {
    fontFamily: "CodecPro-Regular",
    color: "#EB1194",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  // NON UTILISÉ
  listText: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 16,
    marginTop: 30,
  },
});

// Récupération de tous les events liés à l'user - mise à jour à chaque fois qu'on revient sur le screen
// useFocusEffect(
//   useCallback(() => {
//     fetch(`${PATH}/events/user-events/${user.token}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.result) {
//           dispatch(loadEvents(data.events));
//           setEvents(data.events);
//         }
//       });
//   }, [])
// );
