import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../components/Input';
import DropdownMenu from '../components/DropdownMenu';
import GuestInput from '../components/GuestInput';
import GuestCard from '../components/GuestCard';
import MaskedView from '@react-native-masked-view/masked-view';
import globalStyles from '../styles/globalStyles';

export default function CreateEventScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [eventName, setEventName] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [deadLine, setDeadLine] = useState(null);
  const [eventDesc, setEventDesc] = useState(null);

  const [participants, setParticipants] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [amountPerPart, setAmountPerPart] = useState('');

  useEffect(() => {
    const totalParts = participants.reduce((acc, curr) => acc + curr.parts, 0);
    if (totalAmount && totalParts > 0) {
      const newAmountPerPart = totalAmount / totalParts;
      if (newAmountPerPart !== parseFloat(amountPerPart)) {
        setAmountPerPart(newAmountPerPart.toFixed(2));
      }
    } else if (amountPerPart && totalParts > 0) {
      const newTotalAmount = amountPerPart * totalParts;
      if (newTotalAmount !== parseFloat(totalAmount)) {
        setTotalAmount(newTotalAmount.toFixed(2));
      }
    }
  }, [totalAmount, amountPerPart, participants]);

  const handleAddParticipant = (participant) => {
    setParticipants([...participants, { ...participant, parts: 1 }]);
  };

  const handleRemoveParticipant = (participantToRemove) => {
    const updatedParticipants = participants.filter(
      (participant) => participant !== participantToRemove
    );
    setParticipants(updatedParticipants);
  };

  const handleUpdateParts = (guest, parts) => {
    const updatedParticipants = participants.map((participant) => {
      if (participant.email === guest.email) {
        return { ...participant, parts };
      }
      return participant;
    });
    setParticipants(updatedParticipants);
  };

  return (
    <LinearGradient
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      colors={['white', '#CAD1E0']}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 60 })}
      >
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerContainer}>
                <Image
                  source={require('../assets/EASPLIT-NOIR.png')}
                  style={styles.logo}
                />
                <DropdownMenu />
              </View>
              <MaskedView
                style={{ flexDirection: 'row' }}
                maskElement={
                  <Text style={styles.titleText}>Créer un évènement</Text>
                }
              >
                <LinearGradient
                  colors={['#EB1194', '#4E3CBB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linearGradient}
                />
              </MaskedView>
              <Text
                style={[
                  globalStyles.titleList,
                  globalStyles.rose,
                  globalStyles.capital,
                ]}
              >
                Infos de l'évènement
              </Text>
              <View styles={styles.containerList}>
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Nom de l'évènement
                </Text>
                <Input placeholder="Nom de l'évènement" />
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Date de l'évènement
                </Text>
                <Input placeholder="Date de l'évènement" isDate={true} />
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Date de limite de paiement
                </Text>
                <Input placeholder="Date de l'évènement" isDate={true} />
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Description
                </Text>
                <Input placeholder="Description" />
                <Text
                  style={[
                    globalStyles.titleList,
                    globalStyles.rose,
                    globalStyles.capital,
                  ]}
                >
                  Ajout des participants
                </Text>
                <GuestInput onAddGuest={handleAddParticipant} />
                {participants.map((participant, index) => (
                  <GuestCard
                    key={index}
                    guest={participant}
                    onRemoveGuest={handleRemoveParticipant}
                    onUpdateParts={handleUpdateParts}
                  />
                ))}
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Montant Total (en €)
                </Text>
                <TextInput
                  style={[styles.input, styles.amount]}
                  placeholder="Montant Total"
                  keyboardType="numeric"
                  value={totalAmount}
                  onChangeText={setTotalAmount}
                />
                <Text
                  style={[
                    globalStyles.inputLabel,
                    globalStyles.capital,
                    styles.margin,
                  ]}
                >
                  Montant Par Part (en €)
                </Text>
                <TextInput
                  style={[styles.input, styles.amount]}
                  placeholder="Montant Par Part"
                  keyboardType="numeric"
                  value={amountPerPart}
                  onChangeText={setAmountPerPart}
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#EB1194', '#4E3CBB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={globalStyles.gradientBackground}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.buttonText}>Créer l'évènement</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  scrollview: {},
  margin: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'CodecPro-ExtraBold',
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  linearGradient: {
    borderRadius: 0,
    height: 40,
    marginTop: 30,
    width: '100%',
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor:"#f4f3ff",
    color: '#4E3CBB',
    paddingTop:10,
    paddingRight: 20,
    fontFamily: "CodecPro-Regular",
    marginBottom: 10,
    marginHorizontal:10,
    borderTopLeftRadius: 5.33,
    borderTopRightRadius: 5.33,
  },
  amount:{
    fontSize: 30,
    fontFamily: "CodecPro-ExtraBold",
    textAlign:"right",
  },
});