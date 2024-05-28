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
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [event, setEvent] = useState({});
  const [selectedComponent, setSelectedComponent] = useState("expenses");
  const [expenses, setExpenses] = useState([]);

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

  // const onNameChange = (value) => {
  //   setExpenseName(value);
  // };

  // const onAmountChange = (text) => {
  //   if (text.includes(".") && text.split(".")[1].length > 2) {
  //     return;
  //   }
  //   if (!isNaN(text)) {
  //     setExpenseAmount(text);
  //   }
  // };

  // const onImageNameChange = (text) => {
  //   setImageName(text);
  // };

  const EventExpense = () => {
    const [expenseName, setExpenseName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [expenseAmount, setExpenseAmount] = useState("");
    const [imageName, setImageName] = useState("");

    const submitExpense = async () => {
      try {
        if (imageName.trim() === "") {
          alert("Please add an invoice name");
        } else {
          const requestBody = {
            emitter: eventId,
            amount: Number(expenseAmount),
            type: "expense",
            name: expenseName,
            invoice: imageName,
          };

          console.log("Request body:", requestBody);

          const response = await fetch(`${PATH}/transactions/create/expense`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          console.log("Response:", response);
          setExpenseName("");
          setExpenseAmount("");
          setImageName("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const totalExpenses = expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
    const remainingBalance = event.totalSum - totalExpenses;

    return (
      <View>
        <ScrollView
          style={{ ...styles.scrollView, marginTop: 30, maxHeight: 220 }}
          showsVerticalScrollIndicator={true}
        >
          {expenses
            .slice()
            .reverse()
            .map((expense, index) => (
              <View
                key={index}
                style={[
                  styles.listCard,
                  Platform.OS === "ios"
                    ? styles.shadowIOS
                    : styles.shadowAndroid,
                ]}
              >
                <Text style={styles.textCurrentListCard}>{expense.name}</Text>
                <View style={styles.leftPartInsideCard}>
                  <Text
                    style={{ ...styles.textCurrentListCard, marginRight: 30 }}
                  >
                    {expense.amount}€
                  </Text>
                  <Icon
                    name="document-text-sharp"
                    size={25}
                    color="#4E3CBB"
                  ></Icon>
                </View>
              </View>
            ))}
        </ScrollView>
        <View
          style={[
            { ...styles.listCard, marginBottom: 30 },
            Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
          ]}
        >
          <TextInput
            style={styles.textAddingCard}
            placeholder="Nom de la dépense"
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
                  const truncatedText = text.substring(
                    0,
                    text.indexOf(".") + 3
                  );
                  setExpenseAmount(truncatedText);
                } else if (!isNaN(text)) {
                  setExpenseAmount(text);
                }
              }}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="document-text-sharp" size={25} color="#EB1194" />
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom de l'image"
                    value={imageName}
                    onChangeText={(text) => setImageName(text)}
                  />
                  <Button
                    color="#4E3CBB"
                    title="Ajouter l'image"
                    onPress={() => {
                      if (imageName.trim() === "") {
                        alert("Merci de renseigner un nom pour l'image");
                      } else {
                        alert(`Image ${imageName} ajouté!`);
                        setModalVisible(false); // Close the modal
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
              <Text style={styles.textRecapAmount}>{totalExpenses}€</Text>
              <Text style={styles.textRecap}>Total des dépenses</Text>
            </View>
          </View>
          <View style={styles.amount}>
            <Text style={styles.textRecapBalance}>{remainingBalance}€</Text>
            <Text style={styles.textRecap}>Solde restant</Text>
          </View>
        </View>
      </View>
    );
  };

  const EventPayment = () => {
    const currentUser = event.guests.find(
      (guest) =>
        guest.userId.email === user.email &&
        guest.userId.firstName === user.firstName
    );

    const otherGuests = event.guests.filter(
      (guest) =>
        guest.userId.email !== user.email &&
        guest.userId.firstName !== user.firstName
    );

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
          <View>
            {currentUser && (
              <View
                style={[
                  styles.listCard,
                  Platform.OS === "ios"
                    ? styles.shadowIOS
                    : styles.shadowAndroid,
                  styles.currentUserCard,
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.personIconContainer}>
                    <Icon name="person" size={20} color="#4E3CBB"></Icon>
                  </View>
                  <Text
                    style={[styles.textCurrentListCard, styles.currentUserText]}
                  >
                    MOI
                  </Text>
                </View>

                {currentUser.hasPaid ? (
                  <Icon name="checkmark-circle" size={25} color="#EB1194" />
                ) : (
                  <TouchableOpacity
                    onPress={() => handlePayment()}
                    style={styles.PaymentCTAContainer}
                    activeOpacity={0.8}
                  >
                    <View>
                      <Text style={globalStyles.buttonText}>Participer</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {otherGuests.map((guest, i) => (
              <View
                key={i}
                style={[
                  styles.listCard,
                  Platform.OS === "ios"
                    ? styles.shadowIOS
                    : styles.shadowAndroid,
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.personIconContainer}>
                    <Icon name="person" size={20} color="#4E3CBB"></Icon>
                  </View>
                  <View>
                    <Text style={styles.textCurrentListCard}>
                      {guest.userId.firstName}
                    </Text>
                    <Text style={styles.textSmallCurrentListCard}>
                      {guest.userId.email}
                    </Text>
                  </View>
                </View>

                {guest.hasPaid ? (
                  <Icon name="checkmark-circle" size={25} color="#EB1194" />
                ) : (
                  <Icon name="checkmark-circle" size={25} color="#4E3CBB33" />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "expenses") {
      return <EventExpense />;
    } else {
      return <EventPayment />;
    }
  };

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
  PaymentCTAContainer: {
    backgroundColor: "#EB1194",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
