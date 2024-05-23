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

//const PATH = "http://192.168.1.21:8081";
//const PATH = "http://localhost:3000";
const PATH = "https://easplit-backend.vercel.app";

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

  // Le UseEffect permet de mettre à jour en temps réel les montants à chaque changement
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

  //Mécanique pour créer l'évènement :

  //Fonction en cours :) 
  const createEvent = async () => {
    try {
      // 1. Envoyer les données de l'événement au backend pour enregistrer l'événement dans la base de données
      const eventResponse = await fetch(`${PATH}/events/create-event/${user.token}`, { // Faut bien mettre le token, on est d'accord ?
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizer: user._id, // Id normalement récupéré grâce au useSelector plus haut
          name: eventName,
          eventDate,
          paymentDate: deadLine,
          description: eventDesc,
          guests: participants.map((participant) => ({
            // Pour chaque participant, on peut transmettre les ID s'ils existent déjà dans la base de données,
            // soit les adresse e-mail pour les invités qui ne sont pas encore enregistrés
            _id: participant._id, // Si y a l'ID de l'utilisateur, sinon null
            email: participant.email, // Si pas existant
            share: participant.parts, // Le nombre de parts qu'ils prennent
            hasPaid: false, // false car ils n'ont pas encore payé
          })),
          totalSum: parseFloat(totalAmount),
          shareAmount: parseFloat(amountPerPart),
        }),
      });
  
      if (!eventResponse.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
      }
  
      // 2. Récupérer l'ID de l'événement créé à partir de la réponse du serveur
      const { _id } = await eventResponse.json();
  
      // 3. on met à jour chaque participant avec l'ID de l'événement créé (en cours car je galère de ouf)
      await Promise.all(participants.map(async (participant) => {

        //Création fonction pour update le User avec un nouvel évènement :
        const updateUserWithEvent = async (userId, eventId) => {
          try {
            // Rechercher l'utilisateur par son ID
            const user = await User.findById(userId);
        
            // Si l'utilisateur est trouvé, mettre à jour son champ events avec l'ID de l'événement
            if (user) {
              user.events.push(eventId);
              await user.save();
            } else {
              console.log(`Utilisateur avec l'ID ${userId} non trouvé`);
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur avec l\'événement :', error);
          }
        };
        // Si l'utilisateur existe déjà dans la base de données, mettez à jour son champ events avec l'ID de l'événement
        if (participant._id) {
          await updateUserWithEvent(participant._id, _id);//Faire la manipulation pour Update les user avec un event
        }
      }));
  
      // 4. Rediriger ou effectuer toute autre action nécessaire après la création de l'événement
      // Rediriger vers une autre page, afficher un message de succès, etc.
      navigation.navigate('Page avec des confettis, Hourra');
  
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
      // On peut afficher un message d'erreur
    }
  };


  //Bouton handleSubmit
  const handleSubmitEvent = () => {
    // Vérifiez que toutes les données requises sont remplies avant de créer l'événement
    if (eventName && eventDate && deadLine && eventDesc && participants.length > 0 && totalAmount && amountPerPart) {
      // Appelez la fonction pour créer l'événement
      createEvent();
    } else {
      // Affichez un message d'erreur ou effectuez d'autres actions en fonction de vos besoins
      console.error('Veuillez remplir tous les champs avant de créer l\'événement');
    }
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
                  onPress={handleSubmitEvent}
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