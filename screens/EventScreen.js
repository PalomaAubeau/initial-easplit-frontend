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
} from "react-native";
import Input from "../components/Input";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../utils/path";

export default function EventScreen({ route, navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const { eventId } = route.params; // Récupération de l'_id de l'Event (props du screen précédent via la fonction de la navigation)
  //console.log("test recup eventId", eventId);
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});
  const [selectedComponent, setSelectedComponent] = useState("expenses");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");

  //2. Comportements
  // Fetch de récupérartion des informations de l'évènement. Attention: Pour les guests, pas de champs firstName - ce champs n'hexiste pas à la création du compte
  useEffect(() => {
    fetch(`${PATH}/events/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEvent(data.event);
        }
      });
  }, [isFocused]);

  // Fetch de récupération des informations des paiments
  const handlePayment = () => {
    fetch(
      `${PATH}/transactions/create/payment/${user.token}/${event.eventUniqueId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "payment",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetch(`${PATH}/events/event/${eventId}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                setEvent(data.event);
              }
            });
        }
      });
  };

  const EventExpense = () => {
    return (
      <View
      // style={{ flex: 0.5 }}
      >
        <ScrollView
          style={{ ...styles.scrollView, marginTop: 30 }}
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
          <TextInput
            style={styles.textAddingCard}
            placeholder="Ajouter une dépense"
            value={expenseName}
            onChangeText={(value) => setExpenseName(value)}
          />
          <View style={styles.leftPartInsideCard}>
            <TextInput
              style={{ ...styles.textAddingCard, marginRight: 30 }}
              placeholder="XX€"
              keyboardType="numeric"
              value={expenseAmount}
              onChangeText={(text) => {
                if (text.includes(".") && text.split(".")[1].length > 2) {
                  return;
                }
                if (!isNaN(text)) {
                  setExpenseAmount(text);
                }
              }}
            />
            <TouchableOpacity onPress={submitExpense}>
              <Icon name="add-circle" size={30} color="#EB1194"></Icon>
            </TouchableOpacity>
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
              <Text style={styles.textRecapAmount}>{event.totalSum}€</Text>
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
      </View>
    );
  };

  const EventPayment = () => {
    const guestsList = event.guests.map((guest, i) => {
      //console.log("EventPayment data récupérée:", guest.userId.firstName);
      return (
        <View
          key={i}
          style={[
            styles.listCard,
            Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
          ]}
        >
          <Text style={styles.textCurrentListCard}>
            {guest.userId.firstName}
          </Text>
          {guest.hasPaid ? (
            <Icon name="checkmark-circle" size={25} color="#EB1194" />
          ) : (
            <TouchableOpacity onPress={() => handlePayment()}>
              <Icon name="checkmark-circle" size={25} color="#4E3CBB33" />
            </TouchableOpacity>
          )}
        </View>
      );
    });

    return (
      <View>
        <Text
          style={[
            globalStyles.titleList,
            globalStyles.violet,
            globalStyles.capital,
            { marginTop: 20 },
          ]}
        >
          RÉCAPITULATIF DES FONDS
        </Text>

        <View
          style={[
            styles.RecapEventCard,
            Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
          ]}
        >
          <View style={{ ...styles.recapCardRow, margin: 7 }}>
            <Text style={styles.textCurrentListCard}>Budget initial</Text>
            <Text style={styles.textPaymentRecapLeft}>{event.totalSum}€</Text>
          </View>
          <View style={{ ...styles.recapCardRow, margin: 7 }}>
            <Text style={styles.textCurrentListCard}>
              Nombre de participants
            </Text>
            <Text style={styles.textPaymentRecapLeft}>
              {event.guests.length}
            </Text>
          </View>
          <View style={{ ...styles.recapCardRow, margin: 7 }}>
            <Text style={styles.textCurrentListCard}>Total des dépenses</Text>
            <Text style={styles.textPaymentRecapLeft}>XX€</Text>
          </View>
        </View>

        <Text
          style={[
            globalStyles.titleList,
            globalStyles.violet,
            globalStyles.capital,
          ]}
        >
          STATUT DES RÉGLEMENTS
        </Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View>{guestsList}</View>
        </ScrollView>
      </View>
    );
  };

  const submitExpense = () => {
    setExpenseName("");
    setExpenseAmount("");
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "expenses") {
      return <EventExpense />;
    } else {
      return <EventPayment />;
    }
  };

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
    marginBottom: 20,
    // backgroundColor: "white",
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
    padding: 10,
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
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    height: 120,
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
  textPaymentRecapLeft: {
    fontFamily: "CodecPro-ExtraBold",
    color: "#4E3CBB",
    fontSize: 16,
  },
});
