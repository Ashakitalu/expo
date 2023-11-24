import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import Main from "./Main";
import Search from "./Search";
import Profile from "./Profile";
import Orders from "./Orders";
import Like from "./Like";

const Home = () => {
  const [selectedTab, setSelectTab] = useState(0);

  const logOut =  async () => {
    try {
      await AsyncStorage.removeItem('EMAIL');
      console.log('Data removed successfully!');
      navigation.navigate("SelectLogin");
    } catch (error) {
      console.log('Error removing data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Orders />
      ) : selectedTab == 3 ? (
        <Like />
      ) : (
        <Profile />
      )}
      <View style={styles.bottomTabs}>
        <TouchableOpacity
          style={styles.bottomicon}
          onPress={() => {
            setSelectTab(0);
          }}
        >
          <Image
            source={
              selectedTab == 0
                ? require("../../../assets/home-filled.png")
                : require("../../../assets/home.png")
            }
            style={styles.icons}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomicon}
          onPress={() => {
            setSelectTab(1);
          }}
        >
          <Image
            source={
              selectedTab == 1
                ? require("../../../assets/search.png")
                : require("../../../assets/magnifying-glass.png")
            }
            style={styles.icons}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomicon}
          onPress={() => {
            setSelectTab(2);
          }}
        >
          <Image
            source={
              selectedTab == 2
                ? require("../../../assets/shopping-bag-filled.png")
                : require("../../../assets/shopping-bag.png")
            }
            style={styles.icons}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomicon}
          onPress={() => {
            setSelectTab(3);
          }}
        >
          <Image
            source={
              selectedTab == 3
                ? require("../../../assets/heart-filled.png")
                : require("../../../assets/heart.png")
            }
            style={styles.icons}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomicon}
          onPress={() => {
            setSelectTab(4);
            logOut();
          }}
        >
          <Image
            source={
              selectedTab == 4
                ? require("../../../assets/logout.png")
                : require("../../../assets/exit.png")
            }
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabs: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    elevation: 5,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    width: "100%",
  },
  bottomicon: {
    height: "100%",
    alignItems: "center",
    width: "20%",
    justifyContent: "center",
  },
  icons: {
    width: 24,
    height: 24,
  },
});
