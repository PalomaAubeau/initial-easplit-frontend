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

//mockUp

export default function EventScreen({ route, navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const { eventId } = route.params; // Récupération de l'_id de l'Event (props du screen précédent via la fonction de la navigation)
  //console.log("test recup eventId", eventId);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const toggle = () => setIsSelected((previousState) => !previousState);

  //2. Comportements
  useEffect(() => {
    fetch(`${PATH}/events/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // attention certains champs n'existe pas encore,
          setEvent(data.event);
        }
      });
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
      <View
        onValueChange={toggle}
        value={isSelected}
        style={{ ...styles.toggle, backgroundColor: "red" }}
      ></View>

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
