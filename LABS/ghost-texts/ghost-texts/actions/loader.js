import React from 'react';
import { Image, View, Text, Animated, StyleSheet } from 'react-native';

// const opacityValue = new Animated.Value(0);

// const opacity = () => {
//   opacityValue.setValue(0);
//   Animated.timing(opacityValue, {
//     toValue: 1,
//     duration: 1500,
//     easing: Easing.linear,
//   }).start();
// }

export const chooseLoader = loadStatus => {
  console.log(styles.container.opacity)
  switch (loadStatus) {
    case 'ERROR':
      return (
        <Animated.View style={styles.container}>
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
        </Animated.View>
      );
    case 'CONFIRMED':
      return (
        <Animated.View style={styles.container}>
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
        </Animated.View>
      );
    case 'SENDING':
      return (
        <Animated.View style={styles.container}>
          <Animated.Image
            style={{
              flex: 1,
              width: 100,
              height: 100,
            }}
            source={require('../images/loader.png')}
            resizeMode="contain"
          />
          <Text style={{ color: 'white' }}>Sending Message</Text>
        </Animated.View>
      );
    default:
      return;
  }
};
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 175,
    backgroundColor: 'rgba(0,0,0, .75)',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: opacityChange()
  },
});