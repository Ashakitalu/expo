import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { getFirestore, collection, query, getDocs, where, firestore } from "firebase/firestore";
import { app, db } from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password.");
      return;
    }

    const db = getFirestore();

    try {
      const userRef = collection(db, "Admin");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.password === password) {
          await AsyncStorage.setItem("EMAIL", email);
          navigation.navigate("Dashboard");
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User not found with this email");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== "" && password !== "") {
            Login();
          } else {
            alert("Please Enter Email and Password");
          }
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
    marginBottom: 30,
  },
  inputStyle: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginBtn: {
    backgroundColor: "purple",
    width: "90%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

