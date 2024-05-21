import {  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
 } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { updateFirstName } from "../reducers/user";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
      <Image
          source={require("../assets/EASPLIT-NOIR.png")}
          style={styles.logo}

        />
        <Icon name="menu" size={35} color="#4E3CBB" />
      </View>

      <Text style={styles.title}>Bonjour {user.firstName}</Text>

      <Text style={styles.titleList}>MON SOLDE</Text>
      <View style={styles.underline} />

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.eventContainer}>
          <Text style={styles.textCurrentContainer}>16 521 565€</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.newEventContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Event")}
      >
        <Text style={styles.textAddingContainer}>voir plus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    //backgroundColor: "",
  },
  logo: {
    width: 100,
    height: 100,  // Assurez-vous de définir à la fois la largeur et la hauteur
    resizeMode: "contain", 
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 40,
  },

  underline: {
    width: '100%', // Ajustez cette valeur pour la longueur de la ligne de soulignement
    borderBottomWidth: 1, // Épaisseur de la ligne de soulignement
    borderBottomColor: 'black', // Couleur de la ligne de soulignement
    marginTop: 2, // Espace entre le texte et la ligne
    },

  titleList: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4E3CBB",
  },
  scrollView: {},
  eventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    color: "#4E3CBB",
  },
  newEventContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textCurrentContainer: {
    color: "#4E3CBB",
    fontWeight: "bold",
  },
  textAddingContainer: {
    color: "#EB1194",
    fontWeight: "bold",
  },
});
