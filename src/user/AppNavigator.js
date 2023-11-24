import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./Splash";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Add from "../../Tabs/Add";
import Item from "../../Tabs/Item";
import Notification from "../../Tabs/Notification";
import Order from "../../Tabs/Order";
import Transaction from "../../Tabs/Transaction";
import EditItem from "../../Tabs/EditItem";
import SelectLogin from "./SelectLogin";
import UserLogin from "./UserLogin";
import UserSignUp from "../UserSignUp";
import Loader from "../common/Loader";
import Home from "./userTabs/Home";
import Like from "./userTabs/Like";
import Orders from "./userTabs/Orders";
import Profile from "./userTabs/Profile";
import Search from "./userTabs/Search";
import Header from "../common/Header";
import Cart from "./userTabs/Cart";
import Checkout from "./userTabs/Checkout";
import Main from "./userTabs/Main";


const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Header}
          name="Header"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Main}
          name="Main"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AdminLogin}
          name="AdminLogin"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Like}
          name="Like"
          options={{ headerShown: false }}
        />
        
         <Stack.Screen
          component={Orders}
          name="Orders"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Profile}
          name="Profile"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Search}
          name="Search"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserSignUp}
          name="UserSignUp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Loader}
          name="Loader"
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          component={UserLogin}
          name="UserLogin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Add}
          name="Add"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Item}
          name="Item"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={SelectLogin}
          name="SelectLogin"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={EditItem}
          name="EditItem"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Cart}
          name="Cart"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Checkout}
          name="Checkout"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Notification}
          name="Notification"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Order}
          name="Order"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Transaction}
          name="Transaction"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
