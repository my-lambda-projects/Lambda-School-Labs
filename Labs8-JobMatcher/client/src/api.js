/*!
 * Centralized API module.
 *
 * Usage:
 *
 * import API from "../api"
 *
 * API.endpoints.me()
 *   .then()
 *   .catch()
 */
import axios from "axios";

let api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

let authEndpoints = {
  // Todo: Add auth endpoints here
};

let profilesEndpoints = {
  // Todo: Add more profile endpoints
  random(userType) {
    return api.get(`/${userType}s/random/`);
  },
  me() {
    return api.get("/me/");
  },
  signIn(data) {
    data = {
      ...data,
      grant_type: "password",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    };
    return api.post(`/o/token/`, data);
  },

  signUp(userType, data) {
    data = {
      ...data,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    };

    return api.post(`/signup/${userType}/`, data);
  },
  updateUser(userType, userId, data) {
    return api.patch(`/${userType}s/${userId}/`, data);
  }
};

let jobsEndpoints = {
  // Todo: Add jobs endpoints here
  jobs() {
    return api.get("/jobs/");
  },
  createJob(body) {
    return api.post("/jobs/", body);
  },
  updateJob(body, id) {
    return api.patch(`/jobs/${id}/`, body);
  },
  deleteJob(id) {
    return api.delete(`/jobs/${id}/`);
  }
};
let matchesEndpoints = {
  getMatches() {
    return api.get(`/matches/`);
  },
  postMatches(data) {
    return api.post(`/matches/`, data);
  },
  sendEmail(data) {
    return api.post("/send/", data);
  }
};

let billingEndpoints = {
  // Todo: Add billing endpoints here
  async charge(token, item) {
    return await api.post("/charge/", { token, item });
  }
};

let messagesEndpoints = {
  // Todo: Add messages endpoints here
};

api.endpoints = {
  ...authEndpoints,
  ...profilesEndpoints,
  ...jobsEndpoints,
  ...billingEndpoints,
  ...messagesEndpoints,
  ...matchesEndpoints
};

// This adds the access token saved to the browser's local storage
if (localStorage.access_token) {
  console.log("ready to make a call ", localStorage.access_token);
  api.defaults.headers.common["Authorization"] = `Bearer ${
    localStorage.access_token
  }`;
  api.endpoints.me().then(result => {
    console.log("profile end point ", { result });
  });
}

export default api;
