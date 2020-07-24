import React from "react";
import { render } from "react-dom";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";

// Instructions: Try uncommenting a single QUERY and errorPolicy to see how they behave.

// This query will trigger a network error because "missing" is not part of the schema.
const QUERY = gql`{missing}`

// This query will trigger a GraphQL error because the "bad" query throws an error on the server-side.
// Depending on the errorPolicy, result.data may be undefined or partially populated.
// const QUERY = gql`{good, bad}`

// Treats GraphQL errors as network errors. result.error.graphQLErrors will be populated. result.data will be undefined.
// On refetch, a GraphQL exception is thrown to the console.
// const errorPolicy = "none";

// Completely ignores GraphQL errors. result.error will be undefined. result.data will be partially populated.
// const errorPolicy = "ignore";

// Same as "none" except result.data will be partially populated. result.error.graphQLErrors will be populated.
// On refetch, no exception is thrown.
const errorPolicy = "all";

// DO NOT MODIFY BELOW HERE

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "http://localhost:4000"
});

// In dashboard, we use the onError link as a global onError handler.
// We also use it here, just to see if it makes any difference. (It does not.)
const onErrorLink = onError(({ graphQLErrors, response, networkError }) => {
  // The response arg will be undefined for network errors.
  // This means you can't do anything about them in the global onError handler.
  // ref: https://github.com/apollographql/apollo-link/issues/855
});

const client = new ApolloClient({
  link: ApolloLink.from([onErrorLink, httpLink]),
  cache
});

function DataComponent() {
  const result = useQuery(QUERY,
  {
    errorPolicy: errorPolicy,
    // For mutations, the onError handler suppressess network error-exceptions.
    // It does not, however, for network error-exceptions that occur in queries.
    // onError: (args) => {console.log("onError", args)}
  });

  console.log("result", result)

  if (result.loading) return <p>Loading...</p>;
  if (result.error) {
    console.log("graphQLErrors", result.error.graphQLErrors)
    console.log("networkError", result.error.networkError)
    return <div>
      <p>Result: ERROR</p>
      <p>graphQLErrors: {result.error.graphQLErrors ? "true" : "false"}</p>
      <p>networkError: {result.error.networkError ? "true" : "false"}</p>
      <p>See console for more info.</p>
      <button onClick={() => result.refetch()}>Refetch!</button>
    </div>
  }

  return <p>Result: SUCCESS</p>;
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <p>This page makes a graphQL query to an Apollo server running at localhost:4000 and logs any GraphQL errors or network errors. It will print 'true' if there are GraphQL errors and/or network errors present.</p>
      <DataComponent />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
