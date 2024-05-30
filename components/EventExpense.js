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

const EventExpense = ({
  expenses,
  event,
  eventId,
  fetchExpenses,
  setExpenses,
  currentUser,
}) => {
  const dispatch = useDispatch();

  const [expenseName, setExpenseName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [imageName, setImageName] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    if (event.organizer === currentUser) {
      setIsOrganizer(true);
    }
  }, [event, currentUser]);

  const fetchOrganizer = async () => {
    try {
      const response = await fetch(`${PATH}events/organizer/${eventId}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Response text:', text);
      const data = JSON.parse(text);
      if (data.result) {
        console.log('Organizer:', data.organizer);
        setIsOrganizer(data.organizer === 'Your Organizer Identifier');
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      if (error.message === 'Network request failed') {
        console.error('Network error. Please check your internet connection and try again.');
      } else {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchOrganizer();
  }, [eventId]);

  const submitExpense = async () => {
    try {
      if (imageName.trim() === '') {
        alert('Please add an invoice name');
      } else {
        const requestBody = {
          emitter: eventId,
          amount: Number(expenseAmount),
          type: 'expense',
          name: expenseName,
          invoice: imageName,
        };
        console.log('Request body:', requestBody);
        const response = await fetch(`${PATH}/transactions/create/expense`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        fetchExpenses();
        console.log('Response:', response);
        if (response.ok) {
          const newExpense = await response.json();
          dispatch(addExpense(newExpense));
          setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        }
        setExpenseName('');
        setExpenseAmount('');
        setImageName('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  let remainingBalance = 0;
  if (event && event.totalSum) {
    remainingBalance = event.totalSum - totalExpenses;
  }

  return (
    <ScrollView
      style={{ ...styles.scrollView, marginTop: 30 }}
      showsVerticalScrollIndicator={true}
    >
      <View>
        {expenses
          .slice()
          .reverse()
          .map((expense, index) => (
            <View
              key={index}
              style={[
                styles.listCard,
                Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid,
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
        {isOrganizer && (
          <View
            style={[
              { ...styles.listCard, marginBottom: 30 },
              Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid,
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
                  if (text.includes('.') && text.split('.')[1].length > 2) {
                    const truncatedText = text.substring(
                      0,
                      text.indexOf('.') + 3
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
                        if (imageName.trim() === '') {
                          alert('Merci de renseigner un nom pour l\'image');
                        } else {
                          alert(`Image ${imageName} ajouté!`);
                          setModalVisible(false);
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
        )}
        <View
          style={[
            styles.recapCard,
            Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid,
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
    </ScrollView>
  );
};

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

export default EventExpense;
