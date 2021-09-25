import axios from "axios";

// //production
export const Post = query => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/graphql`, query);
};

export const inputToString = input => {
  const data = [];
  for (const key in input) {
    data.push(`${key}: "${input[key]}"`);
  }
  input = data.join(", ");
  return input;
};
