import React from 'react';
import Main from "./src/components/MainComponent";
import {View, StatusBar, SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    );
  }
}
