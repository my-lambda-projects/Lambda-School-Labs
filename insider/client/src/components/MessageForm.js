import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';
import JSEMOJI from 'emoji-js';

import Checkout from './stripe/Elements';
import Emoji from './EmojiPicker';
import { isValidNumber } from 'libphonenumber-js';

const apiURI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030/api/'
    : 'https://www.ghosttexts.com/api/';
const send = 'send';

export default class MessageFeed extends Component {
  // Constructor not needed in React 16
  state = {
    // eslint-disable-line
    recipient: '',
    message: '',
    token: '',
    clearFields: false,
    showEmoji: false,
  };

  setStripeToken = token => {
    this.setState({ token });
  };

  //Loading modal switch cases
  loadingStatus = (status, message) => {
    const { updateParentState } = this.props;
    switch (status) {
      case 'loading':
        updateParentState('loadMessage', {
          message: [],
          loading: true,
          confirmed: false,
          error: false,
        });
        break;
      case 'error':
        updateParentState('loadMessage', {
          message,
          loading: false,
          confirmed: false,
          error: true,
        });
        setTimeout(() => {
          updateParentState('loadMessage', {
            message,
            loading: false,
            confirmed: false,
            error: false,
          });
        }, 2000);
        break;
      case 'confirmed':
        updateParentState('loadMessage', {
          message: [],
          loading: false,
          confirmed: true,
          error: false,
        });
        setTimeout(() => {
          updateParentState('loadMessage', {
            message: [],
            loading: false,
            confirmed: false,
            error: false,
          });
        }, 2000);
        break;
      case 'errorNoOverlay':
        updateParentState('loadMessage', {
          message,
          loading: false,
          confirmed: false,
          error: false,
        });
        break;
      default:
        updateParentState('loadMessage', {
          message: [],
          loading: false,
          confirmed: false,
          error: false,
        });
    }
  };

  /*  Phone number validation. If the number fulfills the criteria in newRec then it is used in sendForm as the isValid var.  */

  validatePhone = recipient => {
    const countryCode = recipient.startsWith('+1' || '1');

    const newRec = countryCode ? recipient : `+1${recipient}`;

    const isValid = isValidNumber(newRec);

    if (isValid) {
      if (!countryCode) this.setState({ recipient: `+1${recipient}` });
      return true;
    } else {
      return false;
    }
  };

  sendForm = () => {
    const { message, recipient, token } = this.state;
    this.loadingStatus('loading');

    const isValid = this.validatePhone(recipient);
    // if the input fields fulfill these conditions of no null message or recipient, no undefined token and returns true in isValid
    if (message !== '' && recipient !== '' && token !== undefined && isValid) {
      // show the loadingStatus modal popup and return an axios POST with the message,recipient and token
      this.loadingStatus('loading');
      return (
        axios
          .post(apiURI + send, {
            message,
            recipient,
            token: token.id,
          })
          // if successful show the confirmed loadingStatus modal popup and instantiate a blank state
          .then(res => {
            this.loadingStatus('confirmed');
            this.setState({
              recipient: '',
              message: '',
              token: '',
            });
          })
          // if error show the error loadingStatus modal with the proper error message, check internet connection is the default msg.
          .catch(error => {
            if (error.message) {
              this.loadingStatus('error', [error.message]);
            } else {
              this.loadingStatus('error', [
                'An error occured. Please check your internet connection and try again.',
              ]);
            }
          })
      );
    } else {
      // handles the invalid phone number error msg. and empty message error cases
      if (
        (message === '' && recipient === '') ||
        (message === '' && !isValid)
      ) {
        this.loadingStatus('error', [
          'Please enter a valid phone number.',
          'Please enter a message.',
        ]);
      } else if (message === '') {
        this.loadingStatus('error', ['Please enter a message.']);
      } else if (recipient === '' || !isValid) {
        this.loadingStatus('error', ['Please enter a valid phone number.']);
      }
    }
  };
  showEmoji = e => {
    e.preventDefault;
    this.setState({ showEmoji: !this.state.showEmoji });
  };

  concatEmoji = (code, emoji) => {
    const jsemoji = new JSEMOJI();
    const { name } = emoji;
    jsemoji.img_set = 'emojione';
    jsemoji.img_sets.emojione.path =
      'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
    const translatedEmoji = jsemoji.replace_colons(`:${name}:`);
    this.setState({ message: this.state.message + translatedEmoji });
  };

  // Handles changes for all inputs
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="col-container">
        <div className="send-message">
          <form>
            <label htmlFor="recipient">To</label>
            <input
              type="tel"
              className="number-form form-control"
              name="recipient"
              onChange={this.handleInput}
              value={this.state.recipient}
              placeholder="+1 555 555 5555"
            />
            <label htmlFor="message">Message</label>
            <div className="input-group mb-3">
              <textarea
                name="message"
                className="message-form form-control"
                onChange={this.handleInput}
                value={this.state.message}
                rows="2"
                placeholder="Write your message here..."
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon1">
                  <a onClick={this.showEmoji} className="smile-emoji">
                    {String.fromCodePoint(0x1f600)}
                  </a>
                </span>
              </div>
            </div>

            {this.state.showEmoji && <Emoji concat={this.concatEmoji} />}
            <StripeProvider apiKey="pk_test_N3kloqdrQMet0yDqnXGzsxR0">
              <Checkout
                loadingStatus={this.loadingStatus}
                setToken={this.setStripeToken}
                loadingState={this.props.loadingState.loadingMessage}
                sendForm={this.sendForm}
                clearFields={this.state.clearFields}
              />
            </StripeProvider>
          </form>
        </div>
      </div>
    );
  }
}
