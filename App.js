import React from 'react';
import Main from "./src/components/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {ConfigureStore} from "./src/redux/configureStore";
import {Provider} from "react-redux";

const store = ConfigureStore();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Main/>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
