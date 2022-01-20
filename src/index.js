import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "https://wired-tarpon-83.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "U2uV93dCa13oqZuujPfRy5UTn3HCcYKiXGbJ48TvyyJRTPmjTA1oX5rciolnzdg6",
  },
  cache: new InMemoryCache(),
});

export const ModalContext = React.createContext();


client
  .query({
    query: gql`
      query MyQuery {
        users {
          created_at
          dob
          email
          first_name
          gender
          last_name
          interests
          id
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
