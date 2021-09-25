import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
class Loader extends Component {
  chooseLoader = loadStatus => {
    switch (loadStatus) {
      case 'ERROR':
        return (
          <View style={styles.container}>
            <Image
              style={{
                flex: 1,
                width: 100,
                height: 100,
              }}
              source={require('../images/error.png')}
              resizeMode="contain"
            />
            <Text style={{ color: 'white' }}>Something Went Wrong!</Text>
          </View>
        );
      case 'CONFIRMED':
        return (
          <View style={styles.container}>
            <Image
              style={{
                flex: 1,
                width: 100,
                height: 100,
              }}
              source={require('../images/completed.png')}
              resizeMode="contain"
            />
            <Text style={{ color: 'white' }}>Message Sent</Text>
          </View>
        );
      case 'SENDING':
        return (
          <View style={styles.container}>
            <Image
              style={{
                flex: 1,
                width: 100,
                height: 100,
              }}
              source={require('../images/loader.png')}
              resizeMode="contain"
            />
            <Text style={{ color: 'white' }}>Sending Message</Text>
          </View>
        );
      default:
        return;
    }
  };

  render() {
    return (
      <View>
        {this.chooseLoader(this.props.loadStatus)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 175,
    backgroundColor: 'rgba(0, 0, 0, .75)',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  let { loadStatus } = state;
  return {
    loadStatus,
  };
};

export default connect(mapStateToProps)(Loader);
