import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class StripeForm extends Component {
  state={
    card: '',
    month: '',
    year: '',
    zip: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ccEntry}>
          <FormLabel>Please Enter You Credit Card</FormLabel>
          <FormInput
            placeholder="CC"
            keyboardType="numeric"
            placeholderTextColor="gray"
            onChangeText={card => this.setState({ card })}
          />
          <View style={styles.ccExtra}>
            <View style={{ flex: 1 }}>
              <FormInput
                placeholder="month"
                keyboardType="numeric"
                placeholderTextColor="gray"
                onChangeText={month => this.setState({ month })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormInput
                placeholder="year"
                keyboardType="numeric"
                placeholderTextColor="gray"
                onChangeText={year => this.setState({ year })}
              />
            </View>
            <View style={{ flex: 2 }}>
              <FormInput
                style={{ flex: 1 }}
                placeholder="zip"
                placeholderTextColor="gray"
                onChangeText={zip => this.setState({ zip })}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 0.5,
    backgroundColor: '#fff',
  },
  ccEntry: {
    flexDirection: 'column',
    flex: 1,
  },
  ccExtra: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
});
