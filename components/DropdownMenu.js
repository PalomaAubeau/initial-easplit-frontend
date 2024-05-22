import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.burgerIcon}>
        <Ionicons name={isOpen ? 'close' : 'menu'} size={30} color="#4E3CBB" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Profil</Text>
          <Text style={styles.menuItem}>Paramètres</Text>
          <Text style={styles.menuItem}>Mentions légales</Text>
          <Text style={[styles.menuItem,styles.logout]}>Se déconnecter</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999, 
  },
  burgerIcon: {
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 25,
    elevation: 3,
  },
  menuItem: {
    paddingTop: 10,
    paddingBottom:5,
    fontSize:16,
    color:"#4E3CBB",
    fontFamily: "CodecPro-Regular",
    borderBottomWidth:1,
    borderBottomColor:"#f4f3ff",

  },
  logout:{
    color:"#EB1194",
    fontFamily: "CodecPro-ExtraBold",
  }
});

export default DropdownMenu;