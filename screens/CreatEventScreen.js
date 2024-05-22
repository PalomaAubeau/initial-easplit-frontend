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
} from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import MaskedView from "@react-native-masked-view/masked-view";
import globalStyles from "../styles/globalStyles"; //Appel des styles globaux

export default function CreatEventScreen({ navigation }) {
  //1.Déclaration des états et imports reducers si besoin
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  return (
    <LinearGradient
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      colors={["white", "#CAD1E0"]}
      start={[0.2, 0.2]}
      end={[0.8, 0.8]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 60 })}
      >
        <View behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerContainer}>
                <Image
                  source={require("../assets/EASPLIT-NOIR.png")}
                  style={styles.logo}
                />
                <Icon name="menu" size={35} color="#4E3CBB" />
              </View>
              {/* Titre en dégradé */}
              <MaskedView
                style={{ flexDirection: "row" }}
                maskElement={
                  <Text style={styles.titleText}>Créer un évènement</Text>
                }
              >
                <LinearGradient
                  colors={["#EB1194", "#4E3CBB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linearGradient}
                />
              </MaskedView>
              {/* fin titre en dégradé */}
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

                  {/* //Ajout des participants */}
                <Text
                style={[
                  globalStyles.titleList,
                  globalStyles.rose,
                  globalStyles.capital,
                ]}
              >
                Ajout des participants
              </Text>

              <View styles={styles.containerList}>

                
              </View>



                {/* //Bouton Submit */}
                <TouchableOpacity
                  onPress={() => handleSubmitEvent()}
                  style={styles.buttonContainer}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#EB1194", "#4E3CBB"]}
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
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  scrollview: {},
  margin: {
    marginHorizontal: 10,
  },

  buttonContainer: {
    display: "flex",
    // width:180,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "CodecPro-ExtraBold",
    // fontWeight:"600",
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  // Style titre en dégradé : Ne pas modifier => risque que le masque se décale
  linearGradient: {
    borderRadius: 0,
    height: 40,
    marginTop: 30,
    width: "100%",
  },
  titleText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: 30,
  },
});
