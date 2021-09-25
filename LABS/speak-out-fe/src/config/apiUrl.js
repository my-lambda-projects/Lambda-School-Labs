const productionURL = `https://speakout-lambda.herokuapp.com`;
// const stagingURL = `https://speakout-lambda-staging.herokuapp.com`;
const localhost = `http://localhost:4000`;


const API_URL = (process.env.REACT_APP_NODE_ENV === 'production') ? productionURL : localhost;

export default API_URL;
