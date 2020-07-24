# Error Handling in Apollo 2.6

The Apollo Client recognizes two types of errors: GraphQL errors and network errors. GraphQL errors are errors that occur within a server resolver. (An example of this is a failed database query.) Network errors, on the other hand, are thrown outside of a server resolver. (An example of this is when the client makes a query that does not exist in the server schema.)

This demo allows you to explore Apollo's error handling behavior with varying error types and `errorPolicy` configurations.

## Getting Started

Start the GraphQL server:

```sh
cd apollo-server-side
npm i
npm start
```

In another shell, start the client-side dev server:

```sh
cd apollo-client-side
npm i
npm start
```

Visit [localhost:3000](http://localhost:3000/).

## Findings

TL;DR - Error handling in Apollo 2.6 is completely inconsistent.

1. There is no error type/`errorPolicy` configuration combination that causes an exception to be thrown to the console (without refetch)!
2. GraphQL errors and network errors that occur during refetch can both result in exceptions (depending on the `errorPolicy`).
3. There is no `errorPolicy`/`onError` configuration that prevents network errors from being thrown to the console during refetch (for queries).
4. The `onError` handler suppresses network error-caused exceptions that occur during refetch _for mutations_.

## Resources

* [Apollo Docs on Error Handling](https://www.apollographql.com/docs/react/v2.6/data/error-handling/)
* [Apollo Blog Post on Error Handling](https://www.apollographql.com/blog/full-stack-error-handling-with-graphql-apollo-5c12da407210/)
