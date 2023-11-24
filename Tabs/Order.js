import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  doc,
  getFirestore,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const { height, width } = Dimensions.get("window");

const Order = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const [userId, setUserId] = useState();
  const db = getFirestore();
  const [totalQuantityMap, setTotalQuantityMap] = useState(new Map());

  useEffect(() => {
    getAllCarts();
  }, [isFocused]);

  useEffect(() => {
    setTotalQuantityMap(calculateQuantity(cartList));
  })

  const getAllCarts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cart"));
      const allCarts = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const cartData = doc.data();
          allCarts.push({ id: doc.id, data: cartData });
        }
      });

      setCartList(allCarts);
      console.log("All Carts:", allCarts);
    } catch (error) {
      console.error("Error getting all carts:", error.message);
    }
  };

  const calculateQuantity = (allCarts) => {
    const quantityMap = new Map();

    allCarts.forEach((cart) => {
      const items = cart.data.items;

      items.forEach((item) => {
        const itemId = item.itemId;

        if (quantityMap.has(itemId)) {
          quantityMap.set(itemId, quantityMap.get(itemId) + 1);
        } else {
          quantityMap.set(itemId, 1);
        }
      });
    });
    return quantityMap;
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Orders</Text>
      </View>
      <View style={styles.body}>
    
        <FlatList
          data={cartList}
          renderItem={({ item }) => {
            console.log("Item:", item); // Log the item object to inspect its structure
            const items = item.data.items; // Access the 'items' field
            if (items && items.length > 0) {
              // Assuming 'items' is an array; adjust accordingly if it's an object
              const firstItem = items[0]; // Assuming you want to display the first item
              return (
                <View style={styles.itemView}>
                  <Image
                    source={{ uri: firstItem.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={styles.nameView}>
                    <Text style={styles.textName}>{firstItem.name}</Text>
                    <Text style={styles.priceName}>
                      {"Tsh " + firstItem.price}
                    </Text>
                    <Text style={styles.quantity}>
  {"Quantity: " + totalQuantityMap.get(firstItem.itemId)}
</Text>

                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.itemView}>
                  <Text>No items in this order</Text>
                </View>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    elevation: 5,
    backgroundColor: "#fff",
    width: width,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  body: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  itemView: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  itemImage: {
    width: 70,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  textName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#000",
    marginLeft: 20,
    marginTop: 15,
  },

  quantity: {
    fontSize: 19,
    fontWeight: "700",
    color: "#000",
    marginLeft: 20,
    marginTop: 15,
  },
  priceName: {
    fontSize: 19,
    fontWeight: "700",
    color: "purple",
    marginLeft: 20,
    marginTop: 15,
  },
});
