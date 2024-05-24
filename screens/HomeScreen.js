import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { updateFirstName } from "../reducers/user";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view"; //pour nom en gradient
import LastTransactions from "../components/LastTransaction";
import globalStyles from "../styles/globalStyles"; //Appel des styles globaux
export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  //console.log('reducerUser' + user)
  return (
    <LinearGradient
      style={styles.container}
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
    > 
    <View
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/EASPLIT-NOIR.png")}
          style={styles.logo}
        />
        <Icon name="menu" size={35} color="#4E3CBB" />
      </View>

      <MaskedView
        style={{ flexDirection: "row" }}
        maskElement={
          <Text style={styles.titleText}>Bonjour {user.firstName}</Text>
        }
      >
        <LinearGradient
          colors={["#EB1194", "#4E3CBB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        />
      </MaskedView>

      <Text style={styles.titleList}>MON SOLDE</Text>
      <View style={styles.underline} />

      <View style={styles.View}>
        <View style={styles.balanceContainer}>
          <Text style={styles.textBalanceContainer}>{user.balance.toFixed(2)}€</Text>
        </View>
        
      </View>
       
      <TouchableOpacity
            onPress={() => handleSubmit()}
            style={globalStyles.buttonContainer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#EB1194", "#4E3CBB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={globalStyles.gradientBackground}
            >
              <View style={globalStyles.textContainer}>
                <Text style={globalStyles.buttonText}>Recharger</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
             // navigation.navigate("Signin");
            }}
          ></TouchableOpacity>



      <Text style={styles.titleList2}>MES DERNIERES TRANSACTIONS</Text>
      <LastTransactions/>
      
      
    
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
    </LinearGradient>
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
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: "CodecPro-ExtraBold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  linearGradient: {
    borderRadius: 0,
    height: 40,
    marginTop: 30,
    width: "100%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginTop: 30,
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
    marginBottom: 15,
  },
  buttonReload2: {
    color: "#EB1194",
  },
  titleList: {
    fontFamily: "CodecPro-ExtraBold",
    marginTop: 10,
    color: "#4E3CBB",
    fontSize: 20,
  },
  titleList2: {
    fontFamily: "CodecPro-ExtraBold",
    marginBottom: 0,
    color: "#4E3CBB",
    marginTop: 5,
    fontSize: 20,
  },
  View: {},
  balanceContainer: {
    backgroundColor:"#FFFFFF",
    
    color: '#4E3CBB',
    fontFamily: "CodecPro-Regular",
    marginBottom: 10,
    borderTopLeftRadius: 5.33,
    borderTopRightRadius: 5.33,
    padding: 10,
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
    fontFamily: "CodecPro-ExtraBold",
    fontSize: 24,
  },
  textBalanceContainer: {
    color: "#4E3CBB",
    fontFamily: "CodecPro-ExtraBold",
    textAlign: 'center',
    fontSize: 28,
  },
  textAddingContainer: {
    color: "#EB1194",
    fontWeight: "bold",
  },
});
