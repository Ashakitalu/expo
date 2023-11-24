import { initializeApp } from "firebase/app";
//import {initializeApp} from '@react-native-firebase/app'
import "firebase/firestore";
import { getFirestore, firebase, firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvOnAv4rBcFUokKHEcoiRVABoxdoRFkE0",
  authDomain: "myexpofirebaseapp.firebaseapp.com",
  projectId: "myexpofirebaseapp",
  storageBucket: "myexpofirebaseapp.appspot.com",
  messagingSenderId: "916547632627",
  appId: "1:916547632627:web:d5fdc60d5c95fc1905a686",
  measurementId: "G-HV49Z1MP7V",
};

//export const app = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { app, db };
