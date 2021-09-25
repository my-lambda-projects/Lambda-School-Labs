const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://testsdepl.herokuapp.com/payment/'
  : 'http://localhost:3300/payment/';

export default PAYMENT_SERVER_URL;