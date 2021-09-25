import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { Container, Button, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardSection from './CardSection';
import AxiosPromise from '.././axiosPromise';
import { getUser, getEvent, setStripeError } from '../../actions';
import AddressSection from './AddressSection';
// import PostalCodeSection from './PostalCodeSection';

// const eventId = Number(sessionStorage.getItem('eventId'));
/* eslint-disable no-console, react/forbid-prop-types */

class CheckoutForm extends React.Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    stripe: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setEvent: PropTypes.func.isRequired,
    setStripeError: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  constructor(props) {
    super(props);
    this.props.setUser();
    this.props.setEvent(this.props.eventId);
    this.ccAddress = {};
  }
  setCCAddress = (o) => {
    this.ccAddress = {};
    Object.keys(o).forEach((key) => {
      if (o[key]) this.ccAddress[key] = o[key];
    });
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const event = this.props.eventId;
    if ((!this.ccAddress) || (!this.ccAddress.name) || this.ccAddress.name.length === 0) {
      this.props.setStripeError('no name provided');
      return;
    }
    this.props.stripe.enabled = true;
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken(this.ccAddress) // User to purchase Event
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        if ((!token) || (!token.id) || (token.id.length < 5)) {
          this.props.setStripeError('bad stripe token, incomplete or bad name/addess');
          return;
        }
        const { email } = this.props.users[0];
        AxiosPromise({
          verb: 'post',
          url: `/checkout/events/${event}`,
          body: {
            token: token.id,
            email,
          },
        }, (err, res) => {
          if (res) {
            console.log('Charge success: ', res.data);
            // ACTIVATE EVENT REQUEST
            const { eventId } = res.data;
            AxiosPromise({
              verb: 'put',
              url: `/events/${eventId}/activate`,
              body: {
                status: res.data.status,
              },
            }, (err2, res2) => {
              if (res2) {
                console.log('Event activated!', res2.data);
                window.location = `/events/details?eventId=${eventId}&admin=${1}`;
              } else {
                console.log('Could not activate event', err2);
                this.props.setStripeError(`Could not activate event ${err2}`);
              }
            // window.location = '/events/details';
            });
          } else {
            console.log('Payment charge unsuccessful', err);
            this.props.setStripeError(`Payment charge unsuccessful ${err}`);
            // window.location = '/';
          }
        });
      });
    this.props.stripe.enabled = false;
  }
  // However, this line of code will do the same thing:
  // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

  render() {
    return (
      <div>
        <AddressSection setCCAddress={this.setCCAddress} />
        <Form onSubmit={this.handleSubmit}>
          <Container>
            <CardSection />
            <Button enabled={this.ccAddress.name} color="success">Buy Now</Button>
          </Container>
        </Form>
      </div>
    );
  }
}
export default connect(
  state => ({
    users: state.users,
    event: state.event,
  }),
  dispatch => ({
    setUser: () => dispatch(getUser),
    setEvent: eventId => dispatch(getEvent(eventId)),
    setStripeError: error => dispatch(setStripeError(error)),
  }),
)(injectStripe(CheckoutForm));

