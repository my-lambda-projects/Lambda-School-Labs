import React, { Component } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default class Emoji extends Component {
  state = {

  }
  render() {
    return (
      <EmojiPicker
        onEmojiClick={(code, emoji) => this.props.concat(code, emoji)}
      />
    );
  }
}
