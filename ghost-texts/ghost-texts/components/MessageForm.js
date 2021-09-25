import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { sendMessage, getToken } from '../actions/actions';
import { connect } from 'react-redux';

import Loader from './Loader';

class MessageForm extends React.Component {
  state = {
    message: '',
    recipient: '',
    card: '',
    month: '',
    year: '',
    cvc: '',
    zip: '',
  };
  createToken = () => {
    Keyboard.dismiss();
    const { card, month, year, cvc, zip } = this.state;
    const cardObj = {
      card,
      month,
      year,
      cvc,
      zip,
    };
    this.props.getToken(cardObj).then(() => {
      const { currToken } = this.props;
      const { message, recipient } = this.state;
      this.sendMessage({
        message,
        recipient,
        token: currToken,
      });
    });
  };
  sendMessage = data => {
    this.props.sendMessage(data).then(() => {
      this.setState({
        message: '',
        recipient: '',
        card: '',
        month: '',
        year: '',
        zip: '',
      });
    });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <FormInput
          style={styles.input}
          placeholder="Phone"
          value={this.state.recipient}
          placeholderTextColor="gray"
          onChangeText={recipient => this.setState({ recipient })}
        />
        <FormInput
          style={{
            height: 100,
            width: '100%',
            flex: 1,
          }}
          multiline={true}
          numberOfLines={4}
          maxLength={160}
          value={this.state.message}
          placeholder="Message"
          placeholderTextColor="gray"
          onChangeText={message => this.setState({ message })}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        <View style={styles.ccContainer}>
          <View style={styles.ccEntry}>
            <FormLabel>Please Enter You Credit Card</FormLabel>
            <FormInput
              placeholder="CC"
              maxLength={16}
              value={this.state.card}
              keyboardType="numeric"
              placeholderTextColor="gray"
              onChangeText={card => this.setState({ card })}
            />
            <View style={styles.ccExtra}>
              <View style={{ flex: 1 }}>
                <FormInput
                  placeholder="month"
                  maxLength={2}
                  keyboardType="numeric"
                  value={this.state.month}
                  placeholderTextColor="gray"
                  onChangeText={month => this.setState({ month })}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  placeholder="year"
                  maxLength={2}
                  keyboardType="numeric"
                  value={this.state.year}
                  placeholderTextColor="gray"
                  onChangeText={year => this.setState({ year })}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholder="CVC"
                  value={this.state.cvc}
                  placeholderTextColor="gray"
                  onChangeText={cvc => this.setState({ cvc })}
                />
              </View>
              <View style={{ flex: 1.5 }}>
                <FormInput
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                  maxLength={5}
                  placeholder="zip"
                  value={this.state.zip}
                  placeholderTextColor="gray"
                  onChangeText={zip => this.setState({ zip })}
                />
              </View>
            </View>
          </View>
        </View>
        <Button
          title="Send Message"
          style={styles.button}
          large
          onPress={this.createToken}
        />
                {this.props.showLoader && (
          <View style={styles.loader}>
            <Loader />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7892F6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    flexWrap: 'wrap',
    fontSize: 16,
  },
  ccContainer: {
    marginTop: 10,
    flex: 0.4,
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
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  let { currToken, tokenCreated, showLoader } = state;
  return {
    showLoader,
    currToken,
    tokenCreated,
  };
};

export default connect(
  mapStateToProps,
  { sendMessage, getToken }
)(MessageForm);
