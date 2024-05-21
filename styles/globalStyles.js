// globalStyles.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      // style du bouton :
      buttonContainer: {
        display: "flex",
        width:180,
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      },
      gradientBackground: {
        flex: 1,
        borderRadius: 10,
        width:200,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      },
    
      textContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'CodecPro-ExtraBold',
        // fontWeight:"600",
        lineHeight: 28,
        letterSpacing: 0.15,
      },
      // fin du style du bouton
      logo: {
        flex: 0.18,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "contain",
        marginBottom: 70,
      },
    
      inputContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 30,
        borderRadius: 10,
      },
    
      input: {
        fontFamily: "CodecPro-Regular",
        width: 180,
        borderBottomColor: "#b5B5B5",
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 16,
      },
    
      textButton: {
        fontFamily: "CodecPro-Regular",
        height: 30,
        fontSize: 12,
      },
      error: {
        marginTop: 10,
        color: "red",
      },
    //   noaccount: {
    //     paddingTop: 30,
    //     paddingBottom: 10,
    //   },
//   textRegular: {
//     fontFamily: 'CodecPro-Regular', // Assurez-vous que votre police est chargée dans App.js
//     fontSize: 16,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   buttonGradient:{

//   }
  // Ajoutez plus de styles globaux ici
});

export default globalStyles;