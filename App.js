import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Librairie Ionicons :
import Icon from 'react-native-vector-icons/Ionicons';
//Sinda : import de mon composant svgChampagne qui correspondant à l'icone des verres de champ :
import SvgChampagne from "./components/SvgChampagne";

import { Provider } from "react-redux";

// A la fin: import du persiststrore
//import { persistStore, persistReducer } from "redux-persist";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { PersistGate } from "redux-persist/integration/react";
//import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import des écrans de navigation

import HomeScreen from "./screens/HomeScreen";
import LogScreen from "./screens/LogScreen"
import EventHomeScreen from "./screens/EventHomeScreen"

// const persistConfig = {
//   key: "easplit",
//   storage: AsyncStorage,
// };

// const reducers = combineReducers({ user });

// const store = configureStore({});

//const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Contenu de la tabBar : 
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            // Icône pour Home via Ionicons
            return <Icon name="home-sharp" size={size} color={color} />;
          } else if (route.name === 'Events') {
            // Icône pour Event via le component
            return <SvgChampagne width={size} height={size} fill={color} />;
          }
        },
        tabBarActiveTintColor: '#EB1194',// le rose
        tabBarInactiveTintColor: '#4E3CBB',// le violet
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventHomeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <Provider store={store}>
      // <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* page de Login : */}
            <Stack.Screen name="Login" component={LogScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      // </PersistGate>
    // </Provider>
  );
}
