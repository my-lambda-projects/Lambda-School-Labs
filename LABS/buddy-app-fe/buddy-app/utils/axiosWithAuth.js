import axios from "axios";

const axiosWithAuth = token => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
};

export default axiosWithAuth;
