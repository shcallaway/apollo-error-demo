Resources:

Apollo Client also distinguishes between two kinds of errors in the GraphQL response — GraphQL errors and network errors. Network errors are errors that are thrown outside of your resolvers. Apollo's default errorPolicy treats any GraphQL errors as network errors and ends the request chain.

https://www.apollographql.com/docs/react/v2.6/data/error-handling/
https://www.apollographql.com/blog/full-stack-error-handling-with-graphql-apollo-5c12da407210/
