import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';

export default class Logo extends Component {
  imageWidth = () => {
    return Math.round(Dimensions.get('window').width);
  };
  render() {
    return (
      <Image
        style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined,
          marginTop: 10,
          marginBottom: 0,
          marginRight: 10,
          marginLeft: 10
        }}
        source={require('../images/ghost_texts_white.png')}
        resizeMode="contain"
      />
    );
  }
}
