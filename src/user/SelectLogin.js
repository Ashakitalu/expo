import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


const SelectLogin = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SelectLogin</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("AdminLogin");
        }}
      >
        <Text style={styles.btnText}>Admin Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}
      onPress={() => {
        navigation.navigate('UserLogin')
      }}
      >
        <Text style={styles.btnText}>User Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "purple",
    height: 50,
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});
