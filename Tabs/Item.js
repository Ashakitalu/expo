import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../src/user/firebaseConfig";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Items")); // Make sure the collection name is 'Items' if that's how it's named in your Firestore

      let tempData = [];

      querySnapshot.forEach((doc) => {
        tempData.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setItems(tempData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const getImageUrl = (fishHappy) => {
    // return `https://firebasestorage.googleapis.com/v0/b/myexpofirebaseapp.appspot.com/o/${encodeURIComponent(fishHappy)}?alt=media`;
    return `https://firebasestorage.googleapis.com/v0/b/myexpofirebaseapp.appspot.com/o/images%2FfishHappy.jpg?alt=media&token=58f2172f-d76f-4e8d-9a99-263caabfc88d`;
  };

  const deleteItem = async (docId) => {
    try {
      await deleteDoc(doc(db, "Items", docId)); // Pass the reference to the document you want to delete
      console.log("Item deleted!");
      getItems();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            {/* <Image
              source={{ uri: item.data.imageUrl }}
              style={styles.itemImage}
            /> */}

            <Image
              source={{ uri: getImageUrl(item.data.imageUrl) }}
              style={styles.itemImage}
            />

            <View style={styles.nameView}>
              <Text style={styles.textName}>{item.data.name}</Text>

              <Text style={styles.namePrice}>{"Tsh " + item.data.price}</Text>
            </View>
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditItem", {
                    data: item.data,
                    id: item.id,
                  });
                }}
              >
                <Image
                  source={require("../assets/edit.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteItem(item.id);
                }}
              >
                <Image
                  source={require("../assets/delete.png")}
                  style={[styles.icon, { marginTop: 20 }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    // marginTop: 20,
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 34,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: "51%",
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
  icon: {
    width: 24,
    height: 24,
  },
});

export default Item;
