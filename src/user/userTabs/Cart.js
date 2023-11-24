// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
// import { StyleSheet, Dimensions } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   doc,
//   getFirestore,
//   updateDoc,
//   getDoc,
//   getDocs,
//   collection,
//   query,
//   where
// } from "firebase/firestore";

// const { height, width } = Dimensions.get("window");

// const Cart = ({ navigation }) => {
//   const isFocused = useIsFocused();
//   const [cartList, setCartList] = useState([]);
//   const [userId, setUserId] = useState();
//   const db = getFirestore();

//   useEffect(() => {
//     getCartsByUserId();
//   }, [isFocused]);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem("USERID");
//         setUserId(storedUserId);
//         await getCartsByUserId(storedUserId);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
  
//     fetchCartData();
//   }, [isFocused]);

//   // const getCartItems = async () => {
//   //   try {
//   //     let userId = await AsyncStorage.getItem('USERID');
//   //     const userDocRef = doc(getFirestore(), 'cart', userId);
//   //     const userDoc = await getDoc(userDocRef);
  
//   //     if (userDoc.exists()) {
//   //       setCartList(userDoc.data().cart);
//   //     } else {
//   //       console.error("User document does not exist");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error getting cart items:", error);
//   //   }
//   // };

//   // const getCartsByUserId = async (userId) => {
//   //   try {
//   //     const q = query(collection(getFirestore(), "cart"), where("userId", "==", userId));
//   //     const querySnapshot = await getDocs(q);
  
//   //     const userCarts = [];
  
//   //     querySnapshot.forEach((doc) => {
//   //       const cartData = doc.data();
//   //       userCarts.push({ id: doc.id, data: cartData });
//   //     });
  
//   //     console.log(`Carts for user ${userId}:`, userCarts);
//   //     return userCarts;
//   //   } catch (error) {
//   //     console.error('Error getting carts by user ID:', error);
//   //     return null;
//   //   }
//   // };

//   // const getCartsByUserId = async (userId) => {
//   //   try {
//   //     if (!userId || typeof userId !== "string") {
//   //       throw new Error("Invalid userId");
//   //     }
  
//   //     const q = query(collection(getFirestore(), "cart"), where("userId", "==", userId));
//   //     const querySnapshot = await getDocs(q);
  
//   //     const userCarts = [];
  
//   //     querySnapshot.forEach((doc) => {
//   //       const cartData = doc.data();
//   //       userCarts.push({ id: doc.id, data: cartData });
//   //     });
//   //     console.log(`Carts for user ${userId}:`, userCarts);
//   //     return userCarts;
//   //   } catch (error) {
//   //     console.error('Error getting carts by user ID:', error);
//   //     return null;
//   //   }
//   // };

//   const getCartsByUserId = async (userId) => {
//     try {
//       if (!userId || typeof userId !== "string") {
//         throw new Error("Invalid userId");
//       }
  
//       const q = query(collection(getFirestore(), "cart"), where("userId", "==", userId));
//       const querySnapshot = await getDocs(q);
  
//       const userCarts = [];
  
//       querySnapshot.forEach((doc) => {
//         const cartData = doc.data();
//         userCarts.push({ id: doc.id, data: cartData });
//       });
  
//       console.log(`Carts for user ${userId}:`, userCarts);
//       setCartList(userCarts);
//     } catch (error) {
//       console.error('Error getting carts by user ID:', error);
//     }
//   };
  
  

//   // const getCartsByUserId = async () => {
//   //   try {
//   //     const storedUserId = await AsyncStorage.getItem("USERID");
//   //     setUserId(storedUserId);

//       // const querySnapshot = await getDocs(
//       //   collection(db, "cart").where("userId", "==", storedUserId)
//       // );

//       // const querySnapshot = await getDocs(collection(db, "cart"));

//       // const userCarts = [];

//       // querySnapshot.forEach((doc) => {
//       //   if (doc.exists()) {
//       //     const cartData = doc.data();
//       //     userCarts.push({ id: doc.id, data: cartData });
//       //   }
//       // });

//   //     console.log(`Carts for user ${storedUserId}:`, userCarts);
//   //     setCartList(userCarts);
//   //   } catch (error) {
//   //     console.error("Error getting carts by user ID:", error);
//   //   }
//   // };

 




//   // const fetchData = async () => {
//   //   try {
//   //     const storedUserId = await AsyncStorage.getItem('USERID');
//   //     setUserId(storedUserId);
  
//   //     const querySnapshot = await getDocs(collection(db, 'cart'));
  
//   //     const userCarts = [];
  
//   //     querySnapshot.forEach((doc) => {
//   //       const cartData = doc.data();
//   //       if (cartData.userId === storedUserId) {
//   //         userCarts.push({ id: doc.id, data: cartData });
//   //       }
//   //     });


//   //     console.log(`Carts for user ${storedUserId}:`, userCarts);
//   //     setCartList(userCarts);
//   //   } catch (error) {
//   //     console.error('Error getting carts by user ID:', error);
//   //   }
//   // };
  

//   //     const userCarts = [];

//   //     querySnapshot.forEach((doc) => {
//   //       if (doc.exists()) {
//   //         const cartData = doc.data();
//   //         userCarts.push({ id: doc.id, data: cartData });
//   //       }
//   //     });

//   //     console.log(`Carts for user ${userId}:`, userCarts);
//   //     return userCarts;
//   //   } catch (error) {
//   //     console.error('Error getting carts by user ID:', error);
//   //     return null; // or handle the error accordingly
//   //   }
//   // };

//   const addItem = async (item) => {
//     try {
//       const userDocRef = doc(getFirestore(), "Users", userId);
//       const userDoc = await getDoc(userDocRef);
//       let tempCart = userDoc.data().cart || [];

//       tempCart = tempCart.map((cartItem) => {
//         if (cartItem.id === item.itemId) {
//           cartItem.data.qty = cartItem.data.qty + 1;
//         }
//         return cartItem;
//       });

//       await updateDoc(userDocRef, { cart: tempCart });
//       getCartsByUserId(userId);
//     } catch (error) {
//       console.error("Error adding item: ", error);
//     }
//   };

//   const removeItem = async (item) => {
//     try {
//       const userDocRef = doc(getFirestore(), "Users", userId);
//       const userDoc = await getDoc(userDocRef);
//       let tempCart = userDoc.data().cart || [];

//       tempCart = tempCart.map((cartItem) => {
//         if (cartItem.id === item.itemId) {
//           cartItem.data.qty = cartItem.data.qty - 1;
//         }
//         return cartItem;
//       });

//       await updateDoc(userDocRef, { cart: tempCart });
//       getCartsByUserId(userId);
//     } catch (error) {
//       console.error("Error removing item: ", error);
//     }
//   };

//   const deleteItem = async (item) => {
//     try {
//       const userDocRef = doc(getFirestore(), "Users", userId);
//       const userDoc = await getDoc(userDocRef);
//       let tempCart = userDoc.data().cart || [];

//       tempCart = tempCart.filter((cartItem) => cartItem.id !== item.itemId);

//       await updateDoc(userDocRef, { cart: tempCart });
//       getCartsByUserId(userId);
//     } catch (error) {
//       console.error("Error deleting item: ", error);
//     }
//   };

//   const getTotal = () => {
//     let total = 0;
//     cartList.forEach((item) => {
//       total = total + item.data.qty * item.data.price;
//     });
//     return total;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("Main");
//           }}
//         >
//           <Image
//             source={require("../../../assets/back.png")}
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.title}>Cart</Text>
//       </View>
//       <View style={styles.body}>
//         <FlatList
//           data={cartList}
//           renderItem={({ item }) => (
//             <View style={styles.itemView}>
//               <Image
//                 source={{ uri: item.data.imageUrl }}
//                 style={styles.itemImage}
//               />
//               <View style={styles.nameView}>
//                 <Text style={styles.textName}>{item.data.name}</Text>
//                 <Text style={styles.namePrice}>{"Tsh " + item.data.price}</Text>
//               </View>
//               <View style={styles.addRemoveView}>
//                 <TouchableOpacity
//                   style={[
//                     styles.addToCartBtn,
//                     {
//                       width: 30,
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginRight: 15,
//                     },
//                   ]}
//                   onPress={() => {
//                     if (item.data.qty > 1) {
//                       removeItem(item);
//                     } else {
//                       deleteItem(item);
//                     }
//                   }}
//                 >
//                   <Text
//                     style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}
//                   >
//                     -
//                   </Text>
//                 </TouchableOpacity>
//                 <Text style={{ fontSize: 16, fontWeight: "600" }}>
//                   {item.data.qty}
//                 </Text>
//                 <TouchableOpacity
//                   style={[
//                     styles.addToCartBtn,
//                     {
//                       width: 30,
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginLeft: 15,
//                     },
//                   ]}
//                   onPress={() => {
//                     addItem(item);
//                   }}
//                 >
//                   <Text
//                     style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}
//                   >
//                     +
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//         {cartList.length > 0 && (
//           <View style={styles.checkoutView}>
//             <Text style={{ color: "#000", fontWeight: "600" }}>
//               {"Items(" + cartList.length + ")\nTotal: Tsh" + getTotal()}
//             </Text>
//             <TouchableOpacity
//               style={[
//                 styles.addToCartBtn,
//                 {
//                   width: 100,
//                   height: 40,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 },
//               ]}
//               onPress={() => {
//                 navigation.navigate("Checkout");
//               }}
//             >
//               <Text style={{ color: "#fff" }}>Checkout</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default Cart;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     height: 60,
//     elevation: 5,
//     backgroundColor: "#fff",
//     width: width,
//     paddingHorizontal: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "purple",
//   },
//   icon: {
//     width: 30,
//     height: 30,
//   },
//   body: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//   },
//   itemView: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     elevation: 4,
//     borderRadius: 10,
//     padding: 10,
//     margin: 10,
//   },
//   itemImage: {
//     width: 70,
//     height: 90,
//     borderRadius: 10,
//     marginRight: 10,
//   },
// });


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
  where
} from "firebase/firestore";

const { height, width } = Dimensions.get("window");

const Order = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const [userId, setUserId] = useState();
  const db = getFirestore();

  useEffect(() => {
    // Fetch the userId from AsyncStorage or your authentication state
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('USERID');
      setUserId(storedUserId);
    };

    fetchUserId();
  }, [isFocused]);

  useEffect(() => {
    if (userId) {
      getAllCarts(userId);
    }
  }, [userId, isFocused]);

  const getAllCarts = async (userId) => {
    try {
      // Query the cart collection with userId filter
      const querySnapshot = await getDocs(
        query(collection(db, "cart"), where("userId", "==", userId))
      );
      const allCarts = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const cartData = doc.data();
          allCarts.push({ id: doc.id, data: cartData });
        }
      });

      setCartList(allCarts);
      console.log('All Carts:', allCarts);
    } catch (error) {
      console.error('Error getting all carts:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AllOrders</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={cartList}
          renderItem={({ item }) => {
            const items = item.data.items;
            if (items && items.length > 0) {
              const firstItem = items[0];
              return (
                <View style={styles.itemView}>
                  <Image
                    source={{ uri: firstItem.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={styles.nameView}>
                    <Text style={styles.textName}>{firstItem.name}</Text>
                    <Text style={styles.namePrice}>{"Tsh " + firstItem.price}</Text>
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
});
