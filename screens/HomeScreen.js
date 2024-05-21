import {
  View,
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

      <View style={styles.View}>
        <TouchableOpacity style={styles.eventContainer}>
          <Text style={styles.textCurrentContainer}>16 521 565€</Text>
        </TouchableOpacity>
        <View style={styles.buttonReloadView}>
          <TouchableOpacity style={styles.buttonReload} activeOpacity={0.8}>
            <Text style={styles.buttonReload2}>RECHARGER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.titleList2}>MES DERNIERES TRANSACTIONS</Text>
      <TouchableOpacity
        style={styles.composantContainer}
      >
        <Text style={styles.textAddingContainer}>COMPOSANT LAST TRANSACTION</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.composantContainer}
      >
        <Text style={styles.textAddingContainer}>COMPOSANT LAST TRANSACTION</Text>
      </TouchableOpacity>
      <Text style={styles.titleList2}>MES DERNIERS EVENTS</Text>



      <TouchableOpacity
        style={styles.newEventContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Event")}
      >
        <Text style={styles.textAddingContainer}>COMPOSANT 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.newEventContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Event")}
      >
        <Text style={styles.textAddingContainer}>COMPOSANT 2</Text>
      </TouchableOpacity>

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
    width: "100%", // Ajustez cette valeur pour la longueur de la ligne de soulignement
    borderBottomWidth: 1, // Épaisseur de la ligne de soulignement
    borderBottomColor: "black", // Couleur de la ligne de soulignement
    marginTop: 2, // Espace entre le texte et la ligne
    marginBottom: 5,
  },

  buttonReload: {
    //content du boutton
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "40%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    
  },
  buttonReloadView: {
    //pour glisser a droite le button
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom:15,
  },
  buttonReload2:{
    color: "#EB1194",

  },
  titleList: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4E3CBB",
    fontSize: 20,
  },
  titleList2: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4E3CBB",
    marginTop: 5,
    fontSize: 20,
  },
  View: {},
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
    marginBottom: 10,
  },
  composantContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 25, //à supprimer surement apres ajout du module (pour estimer la place prise sur le screen)
    borderRadius: 10,
    marginBottom: 10,
  },
  textCurrentContainer: {
    color: "#4E3CBB",
    fontWeight: "bold",
    fontSize: '24px',
  },
  textAddingContainer: {
    color: "#EB1194",
    fontWeight: "bold",
  },
});
