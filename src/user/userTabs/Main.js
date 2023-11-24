import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../common/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import uuid from "react-native-uuid";

const Main = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Items"));

        let tempData = [];
        querySnapshot.forEach((documentSnapshot) => {
          const { name, price, imageUrl } = documentSnapshot.data();
          const itemId = documentSnapshot.id;

          tempData.push({
            itemId,
            data: { name, price, imageUrl },
          });
        });

        setItems(tempData);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchData();
  }, [isFocused]);


const onAddToCart = async (item, index) => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      
      if (!userId) {
        console.error('Invalid userId');
        return;
      }
  
      const { itemId, data } = items[index];
      const cartId = uuid.v4();
  
      await setDoc(doc(db, 'cart', cartId), {
        items: [{
          itemId,
          name: data.name,
          price: data.price,
          imageUrl: data.imageUrl,
          userId: userId
        }],
      });
      
      setCartCount(cartCount + 1);
      console.log('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart: ', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Header
        title={"FishApp"}
        icon={require("../../../assets/shopping-cart.png")}
        count={cartCount}
        navigation={navigation}
        // onClickIcon={() => {
        //   navigation.navigate("Cart");
        // }}
      />

      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View key={item.itemId} style={styles.itemView}>
            <Image
              source={{ uri: item.data.imageUrl }}
              style={styles.itemImage}
            />
            <View style={styles.nameView}>
              <Text style={styles.textName}>{item.data.name}</Text>
              <Text style={styles.namePrice}>{"Tsh " + item.data.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCart}
              onPress={() => {
                onAddToCart(item, index);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.itemId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 34,
  },
  itemImage: {
    width: 70,
    height: 90,
    borderRadius: 10,
    margin: 2,
  },
  nameView: {
    width: "33%",
    margin: 10,
  },
  namePrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "purple",
  },
  textName: {
    fontSize: 18,
    fontWeight: "700",
  },
  addToCart: {
    backgroundColor: "purple",
    width: 110,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
});

export default Main;
