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
  TextInput,
  Pressable,
} from "react-native";
import Input from "../components/Input";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
//import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../utils/path";

//mockUp
const mock = {
  guests: [
    {
      _id: "665084c25b8edd087301f5ac",
      email: "marwane@test.test",
      hasPaid: false,
      userId: [Object],
    },
    {
      _id: "665084c25b8edd087301f5ad",
      email: "test@test.fr",
      hasPaid: false,
      share: 1,
      userId: [Object],
    },
    {
      _id: "665084c25b8edd087301f5ae",
      email: "test@gmail.com",
      hasPaid: false,
      share: 1,
      userId: [Object],
    },
  ],
  name: "Anniv JB",
  organizer: {
    __v: 20,
    _id: "664de90300c4cf782939b7f3",
    balance: 100,
    email: "marwane@test.test",
    events: [
      "664f211fb7c5e5fd2563dee9",
      "664f2160b7c5e5fd2563deee",
      "665062dbffb5f60711559149",
      "665062dbffb5f60711559149",
      "665062dbffb5f60711559149",
      "665063f5ecfa46b745e89eb0",
      "6650649cdd8d1e2d127c0eb2",
      "6650689d2d30bcfb0e0f211b",
      "665069152d30bcfb0e0f2125",
      "665069302d30bcfb0e0f212f",
      "665069662d30bcfb0e0f2139",
      "66506ec42bb6c4b190bf229f",
      "665070f02bb6c4b190bf22a9",
      "665084c25b8edd087301f5ab",
      "665085415b8edd087301f5b8",
      "665085fd0334608c567e9e1f",
      "665087f98e91cde065abcbe3",
      "66508b6e141b88d8c645bcd9",
      "66508d1ce5d9565fadc85172",
      "66508f0abb7443a72a9c99e6",
      "6650a6d74da6a558df29006a",
    ],
    firstName: "Marwanetest",
    lastName: "Test",
    password: "$2b$10$DiEweMDLk1vhI2.F6MJD8OmxNHPQ3jcu9p/zfljow/LEy.SSO1a5S",
    token: "tYfSRuWFBWWOLJaiYrDRkWPDcoGI76nt",
    transactions: ["664f6169f69f20d7b4f7bbc8"],
  },
  shareAmount: 3,
  totalSum: 8889,
  transactions: [],
};

export default function EventScreen({ route, navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const { eventId } = route.params; // Récupération de l'_id de l'Event (props du screen précédent via la fonction de la navigation)
  //console.log("test recup eventId", eventId);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});
  const [selectedComponent, setSelectedComponent] = useState("expenses");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");

  //2. Comportements
  useEffect(() => {
    fetch(`${PATH}/events/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // attention certains champs n'existe pas encore,
          //console.log(data.event);
          setEvent(data.event);
        }
      });
  }, [isFocused]);

  const EventExpense = () => {
    return (
      <View
      // style={{ flex: 0.5 }}
      >
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
    return <Text>Test affichage</Text>;
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
    marginTop: 30,
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
  },
  button: {
    padding: 10,
    backgroundColor: "#4E3CBB33",
    borderRadius: 5,
    width: "50%",
  },
  selectedButton: {
    backgroundColor: "#4E3CBB",
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
  textButton: {
    color: "#FFFFFF",
    fontFamily: "CodecPro-ExtraBold",
    fontSize: 16,
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
});
