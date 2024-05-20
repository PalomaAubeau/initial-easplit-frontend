import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";

// A la fin: import du persiststrore
//import { persistStore, persistReducer } from "redux-persist";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { PersistGate } from "redux-persist/integration/react";
//import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import des écrans de navigation

import HomeScreen from "./screens/HomeScreen";

// const persistConfig = {
//   key: "easplit",
//   storage: AsyncStorage,
// };

// const reducers = combineReducers({ user });

// const store = configureStore({});

//const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen />
      <Tab.Screen />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <Provider store={store}>
      // <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      // </PersistGate>
    // </Provider>
  );
}
