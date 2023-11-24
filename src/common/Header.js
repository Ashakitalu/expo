import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";


const { height, width } = Dimensions.get("window");

const Header = ({ title, icon, count, onClickIcon, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onClickIcon}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    elevation: 5,
    backgroundColor: "#fff",
    width:'100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "purple",
  },
  icon: {
    width: 30, 
    height: 30, 
  },
  countContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 1, 
    paddingHorizontal: 5,
    marginLeft: 5, 
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,

  },
  countText: {
    color: 'white',
  },
});

