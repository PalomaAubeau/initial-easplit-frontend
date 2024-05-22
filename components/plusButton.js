// import Svg, { Path } from "react-native-svg";
import {  View,
    Text,
   } from "react-native";
   import Icon from "react-native-vector-icons/Ionicons";

function plusButton(props) {
    return (
    <LinearGradient
        colors={["#EB1194", "#4E3CBB"]}//Gradient rose vers violet
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            padding: 5, // This should be the border width you want to have
            overflow: 'hidden',
        }}>
        <View
            style={{
            flex: 1,
            borderRadius: 100,
            backgroundColor: '#ecf0f1',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <Icon name="add" size={35} color="#fff" />
        </View>
        </LinearGradient>

    );
  };
  
  export default plusButton;
