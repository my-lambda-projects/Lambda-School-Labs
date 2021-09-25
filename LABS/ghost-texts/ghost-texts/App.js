import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/reducers';

import Logo from './components/Logo';
import { MessageFeed, SendMessage } from './components/Routes';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default class App extends React.Component {
  // Manages Tab View State
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Message' },
      { key: 'second', title: 'Feed' },
    ],
  };

  _renderTabBar = props => {
    return (
      <View style={styles.header}>
        <Logo />
        <TabBar {...props} style={styles.tabBar} />
      </View>
    );
  };

  render() {
    return (
      <Provider store={store}>
          <TabView
            style={styles.tab}
            navigationState={this.state}
            renderScene={SceneMap({
              first: MessageFeed,
              second: SendMessage,
            })}
            renderTabBar={this._renderTabBar}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            useNativeDriver
          />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 22,
  },
  tabBar: {
    backgroundColor: '#577AFB',
  },
  header: {
    backgroundColor: '#577AFB',
    flex: 0.3,
    alignSelf: 'stretch',
  },
});
