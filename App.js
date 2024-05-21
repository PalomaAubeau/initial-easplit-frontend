import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import user from "./reducers/user.js";

//Librairie Ionicons :
import Icon from "react-native-vector-icons/Ionicons";
//Sinda : import de mon composant svgChampagne qui correspond à l'icone des verres de champ' :
import SvgChampagne from "./components/SvgChampagne.js";
//Sinda : ajout pour pouvoir utiliser des dégradés : faire un yarn add expo-linear-gradient ou yarn install
import { LinearGradient } from "expo-linear-gradient";
//Sinda : ajout module expo-font pour utiliser la Codec pro : faire un yarn add expo-font ou yarn install
import * as Font from 'expo-font';
import { useState, useEffect } from "react";


import { Provider } from "react-redux";

// A la fin: import du persiststrore
//import { persistStore, persistReducer } from "redux-persist";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "@reduxjs/toolkit";

// import des écrans de navigation

import LogScreen from "./screens/LogScreen";
import SignUpScreen from "./screens/SignUpScreen.js";
import HomeScreen from "./screens/HomeScreen";
import EventHomeScreen from "./screens/EventHomeScreen";
import CreatEventScreen from "./screens/CreatEventScreen.js";

// const persistConfig = {
//   key: "easplit",
//   storage: AsyncStorage,
// };

// const reducers = combineReducers({ user });

const store = configureStore({ reducer: { user } });

//const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Contenu de la tabBar :
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            // Icône pour Home via Ionicons
            return <Icon name="home-sharp" size={size} color={color} />;
          } else if (route.name === "Events") {
            // Icône pour Event via le component
            return <SvgChampagne width={size} height={size} fill={color} />;
          }
        },
        tabBarActiveTintColor: "#EB1194", // le rose
        tabBarInactiveTintColor: "#4E3CBB", // le violet
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateEvent" component={CreatEventScreen} />
      <Tab.Screen name="Events" component={EventHomeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // import des polices
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'CodecPro-Regular': require('./assets/fonts/CodecPro-Regular.ttf'),
        // 'CodecPro-Bold': require('./assets/fonts/CodecPro-Bold.ttf'),
        'CodecPro-ExtraBold': require('./assets/fonts/CodecPro-ExtraBold.ttf'),
        // 'CodecPro-Light': require('./assets/fonts/CodecPro-Light.ttf'),
        // 'CodecPro-Fat': require('./assets/fonts/CodecPro-Fat.ttf'),
        // 'CodecPro-News': require('./assets/fonts/CodecPro-News.ttf'),
        // 'CodecPro-Thin': require('./assets/fonts/CodecPro-Thin.ttf'),
        // 'CodecPro-Ultra': require('./assets/fonts/CodecPro-Ultra.ttf'),
        // 'CodecPro-Heavy': require('./assets/fonts/CodecPro-Heavy.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      {/* // <PersistGate persistor={persistor}> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* page de Login : */}
          <Stack.Screen name="Login" component={LogScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* // </PersistGate> */}
    </Provider>
  );
}
