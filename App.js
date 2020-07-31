import React from 'react';
import Main from "./src/components/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {ConfigureStore} from "./src/redux/configureStore";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/types/integration/react";
import Loading from "./src/components/Loading";

const {store, persistor} = ConfigureStore();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
        <Main/>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
