import axios from 'axios';

const axiosWithAuth = (token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT_URL,
    headers: {
        Authorization: token,
      },
  });
};

export default axiosWithAuth;