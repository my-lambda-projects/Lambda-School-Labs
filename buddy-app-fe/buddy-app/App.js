import React from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// components
import AppNavigator from "./components/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { buddyReducer } from "./reducers/BuddyReducer";
const store = createStore(buddyReducer);


export default class App extends React.Component {
  state = {
    isReady: false
  };

 

  componentWillMount() {
    (async () => {
      await Font.loadAsync({
        "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf"),
        "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
        "Nunito-ExtraLight": require("./assets/fonts/Nunito-ExtraLight.ttf"),
        "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf")
      });

      this.setState({ isReady: true });
    })();
  }


  render() {
    return (
      <Provider store={store}>
        {this.state.isReady ? <AppNavigator /> : <AppLoading />}
      </Provider>
    );
  }
}
