import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import auth from "./Auth/Auth";
import "./index.css";
import App from "./App";

const httpLink = new createHttpLink({
  uri:
    process.env.REACT_APP_CURR_ENV === "dev"
      ? "http://localhost:4000"
      : process.env.REACT_APP_BACKEND_URL
});

const authLink = setContext((_, { headers }) => {
  const id_token = auth.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: id_token ? id_token : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
