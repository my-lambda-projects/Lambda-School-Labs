import axios from "axios";
import * as actions from "./actionTypes";
import FormData from "form-data";
// import { withRouter } from 'react-router';
//  const SERVER_URL = "https://lambda-map.herokuapp.com";
const SERVER_URL = "http://127.0.0.1:8000";

export const subscribe = data => {
  const response = axios.post(`${SERVER_URL}/api/subscribe`, data);
  return dispatch => {
    dispatch({
      type: actions.FETCH_SUBSCRIBE
    });
    return new Promise(function(resolve, reject) {
      response
        .then(res => {
          dispatch({
            type: actions.FETCHED_SUBSCRIBE,
            response: res
          });
          resolve(res.data);
        })
        .catch(err => {
          reject("error subscribing");
        });
    });
  };
};

export const login = (data, history) => {
  const token = window.sessionStorage.getItem("jwt") || null;
  const config = {
    headers: { jwt: `${token}`, "Access-Control-Allow-Origin": "*" }
  };
  const user = axios.post(`${SERVER_URL}/api/login/`, data, config);
  return dispatch => {
    dispatch({
      type: actions.LOGIN
    });
    user
      .then(response => {
        if (response.data.account_type === false) {
          window.sessionStorage.setItem("jwt", response.headers.jwt);
          window.localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({
            type: actions.LOGGEDIN_CLIENT,
            payload: response.data
          });
          history.push("/jslanding/");
        } else if (response.data.account_type === true) {
          window.sessionStorage.setItem("jwt", response.headers.jwt);
          window.localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({
            type: actions.LOGGEDIN_HPS,
            payload: response.data
          });
          history.push("/hplanding/");
        }
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_ATLOGIN,
          payload: ("ERROR logging in", err)
        });
      });
  };
};

export const register = data => {
  const config = { headers: { "Access-Control-Allow-Origin": "*" } };
  const user = axios.post(`${SERVER_URL}/api/register/`, data, config);
  return dispatch => {
    dispatch({
      type: actions.REGISTER
    });
    user
      .then(response => {
        if (response.data.account_type === "false") {
          dispatch({
            type: actions.REGISTERED_CLIENT,
            payload: response.data
          });
        } else if (response.data.account_type === "true") {
          dispatch({
            type: actions.REGISTERED_HPS,
            payload: response.data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actions.REGISRATION_ERROR,
          payload: ("ERROR creating account", err)
        });
      });
  };
};

export const signout = history => {
  const token = window.sessionStorage.getItem("jwt") || null;
  const config = { headers: { jwt: `${token}` } };
  const user = axios.get(`${SERVER_URL}/api/logout/`, config);
  return dispatch => {
    user
      .then(response => {
        window.sessionStorage.removeItem("jwt");
        window.localStorage.removeItem("user");
        history.push("/");
        dispatch({
          type: actions.SIGNOUT,
          payload: ("User signed out", response.data)
        });
      })
      .catch(err => {
        dispatch({
          type: actions.SIGNOUT_ERROR,
          payload: ("ERROR signout", err)
        });
      });
  };
};

export const get_clients = () => {
  const clients = axios.get(`${SERVER_URL}/api/clients/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_CLIENTS });
    clients
      .then(response => {
        dispatch({
          type: actions.FETCHED_CLIENTS,
          payload: response.data.Clients
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: ("ERROR fetching clients", err)
        });
      });
  };
};

export const get_hpFavs = () => {
  const clients = axios.get(`${SERVER_URL}/api/hire-partner-favorites/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_HPFAVORITES });
    clients
      .then(response => {
        dispatch({
          type: actions.FETCHED_HPFAVORITES,
          payload: response.data.Hire_Partner
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: "ERROR fetching hire partner favorites"
        });
      });
  };
};

export const get_clientFavs = () => {
  const clientFavs = axios.get(`${SERVER_URL}/api/client-favorites/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_CLIENTFAVORITES });
    clientFavs
      .then(response => {
        dispatch({
          type: actions.FETCHED_CLIENTFAVORITES,
          payload: response.data.Client_Favorites
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: "ERROR fetching clients favorites"
        });
      });
  };
};

export const get_hiring_partners = () => {
  const hiring_partners = axios.get(`${SERVER_URL}/api/hire-partners/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_HPS });
    hiring_partners
      .then(response => {
        dispatch({
          type: actions.FETCHED_HPS,
          payload: response.data.Hire_Partners
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: "ERROR fetching hiring partner"
        });
      });
  };
};

export const get_listings = () => {
  const job_listing = axios.get(`${SERVER_URL}/api/job-listings/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_LISTINGS });
    job_listing
      .then(response => {
        dispatch({
          type: actions.FETCHED_LISTINGS,
          payload: response.data.HPjobListings
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: "ERROR fetching job listings"
        });
      });
  };
};

export const get_client = ID => {
  const client = axios.get(`${SERVER_URL}/api/client/${ID}/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_CLIENT });
    client
      .then(response => {
        dispatch({
          type: actions.FETCHED_CLIENT,
          payload: response.data.Client
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_FETCHING,
          payload: "ERROR fetching clients"
        });
      });
  };
};

export const create_listing = ID => {
  const job_listing = axios.post(`${SERVER_URL}/api/create-listing/`, ID);
  return dispatch => {
    dispatch({
      type: actions.CREATE_LISTING
    });
    job_listing
      .then(response => {
        dispatch({
          type: actions.CREATED_LISTING,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_CREATINGJOB,
          payload: ("ERROR creating job listing", err)
        });
      });
  };
};

export const delete_listing = pk => {
  const job_listing = axios.delete(`${SERVER_URL}/api/delete-listing/${pk}`);
  return dispatch => {
    dispatch({
      type: actions.DELETE_LISTING
    });
    job_listing
      .then(response => {
        dispatch({
          type: actions.FETCH_LISTINGS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_DELETING,
          payload: ("ERROR deleting job listing", err)
        });
      });
  };
};

export const get_hp = id => {
  const hp = axios.get(`${SERVER_URL}/api/hp/${id}/`);
  return dispatch => {
    dispatch({ type: actions.FETCH_HP });
    hp.then(response => {
      dispatch({
        type: actions.FETCHED_HP,
        payload: response.data.Hire_Partner
      });
    }).catch(err => {
      dispatch({
        type: actions.ERROR_FETCHING,
        payload: "ERROR fetching HP by id"
      });
    });
  };
};

export const update = obj => {
  const token = window.sessionStorage.getItem("jwt") || null;
  const config = {
    headers: {
      jwt: `${token}`,
      accept: "application/json",
      enctype: "multipart/form-data"
    }
  };
  const data = new FormData();
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]]) {
      if (keys[i] === "picture") {
        data.append("file", obj[keys[i]]);
      } else {
        data.append(keys[i], obj[keys[i]]);
      }
    }
  }
  const user = axios.post(`${SERVER_URL}/api/update/`, data, config);
  return dispatch => {
    dispatch({
      type: actions.UPDATE
    });
    user
      .then(response => {
        if (response.data.account_type === false) {
          dispatch({
            type: actions.UPDATED_CLIENT,
            payload: response.data
          });
        } else if (response.data.account_type === true) {
          dispatch({
            type: actions.UPDATED_HPS,
            payload: response.data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_UPDATING,
          payload: ("ERROR logging in", err)
        });
      });
  };
};
