import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Loader from "./common/Loader";
import { Firestore, firestore, collection, addDoc } from "firebase/firestore";
import "firebase/firestore";
import { db } from "./user/firebaseConfig";
import uuid from "react-native-uuid";

const UserSignup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const saveUser = async () => {
    setModalVisible(true);
    const userId = uuid.v4();
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        name: name,
        password: password,
        email: email,
        mobile: mobile,
        address: address,
        userId: userId,
        cart: []
      });
      console.log("Document written with ID: ", docRef.id);
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      setModalVisible(false);
      console.error("Error adding document: ", error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your name"}
          value={name}
          onChangeText={(txt) => setName(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your Password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your Email Id"}
          value={email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter your mobile"}
          value={mobile}
          keyboardType="number-pad"
          onChangeText={(txt) => setMobile(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your Address"}
          value={address}
          onChangeText={(txt) => setAddress(txt)}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (
              email !== "" &&
              address !== "" &&
              password !== "" &&
              name !== "" &&
              mobile !== "" &&
              mobile.length > 9
            ) {
              saveUser();
            } else {
              alert("Please Enter Data");
            }
          }}
        >
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ScrollView>
  );
};

export default UserSignup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginTop: 100,
    alignSelf: "center",
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: "90%",
  },
  loginBtn: {
    backgroundColor: "purple",
    width: "90%",
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
