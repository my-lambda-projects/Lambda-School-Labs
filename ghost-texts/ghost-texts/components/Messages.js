import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { getMessages } from '../actions/actions';
import { connect } from 'react-redux';
import Message from './Message';

class Messages extends React.PureComponent {
  componentDidMount() {
    this.props.getMessages();
  }
  _keyExtractor = (message, index) => {
    return message.sid;
  };

  render() {
    const { messages, isGettingMessages } = this.props;
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          title="Send Your Own Message Now"
          medium
          iconRight={{ name: 'message' }}
        />
        <Text style={styles.title}>Recent Messages</Text>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message body={item.body} />}
          onRefresh={() => this.props.getMessages()}
          refreshing={isGettingMessages}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#7892F6',
    margin: 10,
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden'
  },
  title: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  let { messages, isGettingMessages } = state;
  return {
    messages,
    isGettingMessages,
  };
};

export default connect(
  mapStateToProps,
  { getMessages }
)(Messages);
