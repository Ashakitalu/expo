// import React from "react";
// import AppNavigator from "./src/user/AppNavigator";
// const App = () => {
//   return <AppNavigator />;
// };

// export default App;

import { Text, AppRegistry } from "react-native";
import AppNavigator from "./src/user/AppNavigator";

const App = () => {
  return <AppNavigator />;
};

AppRegistry.registerComponent("myfirebaseproject", () => App);

export default App;
