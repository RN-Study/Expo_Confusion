import React from 'react';
import Main from "./src/components/MainComponent";
import {View, StatusBar, SafeAreaView} from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
      <Main />
        </SafeAreaView>
      </View>
    );
  }
}
