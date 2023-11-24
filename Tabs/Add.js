import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { getFirestore } from 'firebase/firestore';
import { app, db } from '../src/user/firebaseConfig';
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
//import { app, db } from "../src/user/firebaseConfig";
 import 'firebase/firestore';
 import { collection, addDoc } from "firebase/firestore";
 import { getStorage, ref, uploadBytes } from "firebase/storage";
 import { getDownloadURL } from '@firebase/storage';
 import uuid from "react-native-uuid";



const Add = () => {
  const [name, setName] = useState(""); // State variables to store input values
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State variable to store the selected image URI
  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work.");
    } else {
      pickImage(); // If permission is granted, allow the user to pick an image
    }
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  };

const uploadImage = async () => {
  if (selectedImage) {
    const storage = getStorage(app);

    const storageRef = ref(storage, 'images/fishHappy.jpg');

    try {
      await uploadBytes(storageRef, selectedImage.uri);
      const downloadURL = await getDownloadURL(storageRef); // Fetch the download URL

      // Ensure the download URL is retrieved successfully before using it
      if (downloadURL) {
        uploadItem(downloadURL); // Pass the URL to the function that uploads data to Firestore
      } else {
        console.error('Download URL is not available.');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  } else {
    console.error('No selected image to upload.');
  }
};


    const uploadItem = async (imageUrl) => {
      try {
        const itemId = uuid.v4();
        const docRef = await addDoc(collection(db, 'Items'), {
          itemId: itemId,
          name: name,
          price: price,
          imageUrl: imageUrl,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Item</Text>
        </View>
        {selectedImage !== null ? (
          <Image
            source={{ uri: selectedImage
        
            }}
            style={{
              width: "90%",
              height: 200,
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        ) : null}

        <TextInput
          placeholder="Enter Item Name"
          style={styles.inputStyle}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter Item Price"
          style={styles.inputStyle}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        
        <TextInput
          placeholder="Enter Item Image URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <Text style={{ alignSelf: "center", marginTop: 20 }}>OR</Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            pickImage();
          }}
        >
          <Text>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
          if (selectedImage) {
            uploadImage();
          } else {
            alert("Please select an image first.");
          }
        }}
        >
          <Text style={{ color: "#Fff" }}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Add;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    elevation: 5,
    paddingLeft: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputStyle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: "center",
  },
  pickBtn: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: "purple",
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  imageStyle: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});

