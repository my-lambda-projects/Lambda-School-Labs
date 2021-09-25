const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://dontemail.herokuapp.com/payment"
    : "http://localhost:5000/payment/";

export default PAYMENT_SERVER_URL;
