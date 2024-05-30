import { StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";
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
  TextInput,
  Pressable,
  Modal,
  Button,
} from "react-native";
import Input from "../components/Input";
import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../utils/path";
import GuestInput from "../components/GuestInput";
import { addExpense } from "../reducers/event";
import EventPayment from "../components/EventPayment";
import EventExpense from "../components/EventExpense";

export default function EventScreen({ route, navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const { eventId } = route.params; // Récupération de l'_id de l'Event (props du screen précédent via la fonction de la navigation)
  //console.log("test recup eventId", eventId);
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});
  const [selectedComponent, setSelectedComponent] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${PATH}/events/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEvent(data.event);
        }
      });
  }, [isFocused]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${PATH}/transactions/expenses/${eventId}`);
      const data = await response.json();

      if (data.response) {
        setExpenses(data.expenses);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const renderSelectedComponent = () => {
    if (selectedComponent === "expenses") {
      return (
        <EventExpense
          expenses={expenses}
          event={event}
          eventId={eventId}
          fetchExpenses={fetchExpenses}
          setExpenses={setExpenses}
        />
      );
    } else {
      return (
        <EventPayment
          expenses={expenses}
          event={event}
          eventId={eventId}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
    >
      <ScrollView
        style={{ ...styles.scrollView }}
        showsVerticalScrollIndicator={false}
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

        <View style={styles.toggleSelection}>
          <Pressable
            style={[
              styles.button,
              selectedComponent === "expenses" && styles.selectedButton,
            ]}
            onPress={() => setSelectedComponent("expenses")}
          >
            <Text style={styles.textButton}>Toutes les dépenses</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              selectedComponent === "payments" && styles.selectedButton,
            ]}
            onPress={() => setSelectedComponent("payments")}
          >
            <Text style={styles.textButton}>Tous les paiements</Text>
          </Pressable>
        </View>
        <View>{renderSelectedComponent()}</View>
      </ScrollView>
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
    // flex:1,
    marginBottom: 20,
    // backgroundColor: "white",
  },
  participer: {
    height: 25,
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
  // TOOGLE SELECTION
  toggleSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4E3CBB33",
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 10,
    width: "50%",
  },
  selectedButton: {
    backgroundColor: "#4E3CBB",
    borderRadius: 5,
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
  RecapEventCard: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    height: 150,
  },
  // TEXTES
  textGoBack: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 20,
    marginLeft: 20,
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "CodecPro-ExtraBold",
    fontSize: 16,
    textAlign: "center",
  },
  textCurrentListCard: {
    fontFamily: "CodecPro-Regular",
    color: "#4E3CBB",
    fontSize: 16,
  },
  textAddingCard: {
    fontFamily: "CodecPro-ExtraBold",
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
  currentUserText: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 20,
  },
  textPaymentRecapLeft: {
    fontFamily: "CodecPro-ExtraBold",
    fontSize: 16,
    color: "#4E3CBB",
  },
  textSmallCurrentListCard: {
    fontFamily: "CodecPro-Regular",
    color: "#4E3CBB",
    fontSize: 12,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  //CSS de la modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontFamily: "CodecPro-ExtraBold",
    width: 180,
    borderBottomColor: "#4E3CBB",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 30,
    fontSize: 20,
    color: "#4E3CBB",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#EB1194",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  personIconContainer: {
    backgroundColor: "#4E3CBB33",
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
  },
  // AUTRES
  paymentCTAContainer: {
    backgroundColor: "#EB1194",
    // paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
