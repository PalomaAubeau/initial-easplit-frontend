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
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
//import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../utils/path";

//mockUp de ce que renvoie le back pour avancer en attendant
const mockUp = {
  guests: [
    {
      _id: "664cb0e666f7e725eb4e882f",
      email: "test@gmail.com",
      hasPaid: false,
      share: 1,
      userId: [Object],
    },
    {
      _id: "664d063d0cd79e6c9c674d35",
      email: "yanis1@outlook.fr",
      hasPaid: false,
      share: 0,
      userId: [Object],
    },
  ],
  name: "Soirée fin de batch",
  organizer: {
    __v: 0,
    _id: "664c520b26f4a54baf6d1fa4",
    balance: 0,
    email: "sinda-gouret@hotmail.fr",
    events: [],
    firstName: "Sinda",
    lastName: "G",
    password: "$2b$10$fDIP0j7WXuQ1.aG8H9j.2eL/Y4sD2gFuatsNJmYuufyWeBqC1QsxO",
    token: "8Gq7VcKrijR2DmhMhqQXD6XJnnveLuu0",
    transactions: [],
  },
  transactions: [
    {
      __v: 0,
      _id: "664dbc65b1c88b66886675df",
      amount: 3.3,
      date: "2024-05-30T00:00:00.000Z",
      emitter: "664cac4ea1ac241f7accda7b",
      eventId: "664caee366f7e725eb4e8820",
      recipient: "664caee366f7e725eb4e8820",
      type: "payment",
    },
    {
      __v: 0,
      _id: "664f31c3427d3403ba8fb3a8",
      amount: 48,
      category: "deco",
      date: "2024-05-23T00:00:00.000Z",
      emitter: "664c492570f310fadd276320",
      eventId: "664e40b04588780c66b6de17",
      name: "ballons",
      recipient: "664e40b04588780c66b6de17",
      type: "payment",
    },
    {
      __v: 0,
      _id: "664f36cf65bd8775cc73b54c",
      amount: 312,
      category: "nourriture",
      date: "2024-05-23T00:00:00.000Z",
      emitter: "664c500526f4a54baf6d1f9d",
      eventId: "664e40b04588780c66b6de17",
      name: "gateaux",
      recipient: "664e40b04588780c66b6de17",
      type: "payment",
    },
    {
      __v: 0,
      _id: "664f36e265bd8775cc73b555",
      amount: 24,
      category: "instru",
      date: "2024-05-23T00:00:00.000Z",
      emitter: "664c500526f4a54baf6d1f9d",
      eventId: "664e40b04588780c66b6de17",
      name: "guitar",
      recipient: "664e40b04588780c66b6de17",
      type: "payment",
    },
  ],
};

export default function EventScreen({ route, navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const { eventId } = route.params; // Récupération de l'_id de l'Event (props du screen précédent via la fonction de la navigation)
  //console.log(eventId);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});

  //2. Comportements
  useEffect(() => {
    (async () => {
      const res = await fetch(`${PATH}/events/event/${eventId}`);
      const data = await res.json();
      if (data.result) {
        // attention certains champs n'existe pas encore,
        setEvent(data.event);
      }
    })();
  }, [isFocused]);

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
        style={styles.goback}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("EventsList")}
      >
        <Icon name="arrow-back" size={35} color="#4E3CBB"></Icon>
        <Text style={styles.textGoBack}>{event.name}</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.listCard,
            Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
          ]}
        >
          <Text style={styles.textCurrentListCard}>Nom dépense </Text>
          <View style={styles.leftPartInsideCard}>
            <Text style={{ ...styles.textCurrentListCard, marginRight: 30 }}>
              XX€
            </Text>

            <Icon name="document-text-sharp" size={25} color="#4E3CBB"></Icon>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          { ...styles.listCard, marginBottom: 30 },
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
      >
        <Text style={styles.textAddingCard}>Ajouter une dépense </Text>
        <View style={styles.leftPartInsideCard}>
          <Text style={{ ...styles.textAddingCard, marginRight: 30 }}>XX€</Text>
          <Icon name="add-circle" size={30} color="#EB1194"></Icon>
        </View>
      </View>

      <View
        style={[
          styles.recapCard,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
      >
        <View style={styles.recapCardRow}>
          <View style={styles.amount}>
            <Text style={styles.textRecapAmount}>XX€</Text>
            <Text style={styles.textRecap}>Budget initial</Text>
          </View>
          <View style={styles.amount}>
            <Text style={styles.textRecapAmount}>XX€</Text>
            <Text style={styles.textRecap}>Total des dépenses</Text>
          </View>
        </View>
        <View style={styles.amount}>
          <Text style={styles.textRecapBalance}>XX€</Text>
          <Text style={styles.textRecap}>Solde restant</Text>
        </View>
      </View>
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
  goback: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 30,
  },
  scrollView: {
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
  listCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  leftPartInsideCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  recapCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
    height: 200,
  },
  recapCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    alignItems: "center",
    margin: 20,
  },
  // TEXTES
  textGoBack: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 20,
    marginLeft: 20,
  },
  textCurrentListCard: {
    fontFamily: "CodecPro-Regular",
    color: "#4E3CBB",
    fontSize: 16,
  },
  textAddingCard: {
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
  textRecap: {
    fontFamily: "CodecPro-Regular",
    color: "#4E3CBB",
    fontSize: 16,
    marginTop: 10,
  },
  textRecapAmount: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 20,
  },
  textRecapBalance: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#EB1194",
    fontSize: 25,
  },
});
