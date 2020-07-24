const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    good: String
    bad: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    good: (root, args, context) => {
      console.log("query - good");
      return 'Yay!';
    },
    bad: (root, args, context) => {
      console.log("query - bad");
      // This is a GraphQL error because it happens in the resolver!
      throw new Error("Something went wrong.");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
