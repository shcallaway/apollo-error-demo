import React from "react";
import { render } from "react-dom";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "http://localhost:4000"
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {});

const client = new ApolloClient({
  link: ApolloLink.from([onErrorLink, httpLink]),
  // defaultOptions: {
  //   errorPolicy: "ignore"
  // },
  cache
});

function DataComponent() {
  // This query will be partially fullfilled ('bad' throws an error but 'good' does not).
  // const result = useQuery(gql`{bad, good}`,
  // This query will trigger a network error because 'missing' is not part of the schema.
  const result = useQuery(gql`{missing}`,
  {
    // Treats GraphQL errors as network errors. result.error.graphQLErrors will be populated. result.data is undefined.
    errorPolicy: "none"
    // Completely ignores GraphQL errors. result.error will be undefined. result.data will be partially populated.
    // errorPolicy: "ignore"
    // This seems to do the same thing as 'none'? Docs say it saves error to the cache. result.data will be partially populated.
    // errorPolicy: "all"
  });

  console.log("result", result)

  if (result.loading) return <p>Loading...</p>;
  if (result.error) {
    console.log("graphQLErrors", result.error.graphQLErrors)
    console.log("networkError", result.error.networkError)
    return <p>ERROR (CHECK THE CONSOLE)</p>
  }

  return <p>SUCCESS</p>;
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <p>This page makes a graphQL query to an Apollo server running at localhost:4000 and logs any graphQLErrors or networkErrors</p>
      <DataComponent />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
