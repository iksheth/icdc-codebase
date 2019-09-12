import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";

const BACKEND = process.env.REACT_APP_BACKEND_API;

const client = new ApolloClient({
  uri: BACKEND
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {" "}
    <ApolloProviderHooks client={client}>
      <App />
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
