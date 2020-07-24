// DO NOT MODIFY THIS FILE

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    good: String
    bad: String
  }
  type Mutation {
    doThing(type: String): String
  }
`;

const resolvers = {
  Query: {
    good: (parent, args, context, info) => {
      console.log("query - good");
      return 'Yay!';
    },
    bad: (parent, args, context, info) => {
      console.log("query - bad");
      // This is a GraphQL error because it happens in the resolver!
      throw new Error("Something went wrong.");
    }
  },
  Mutation: {
    doThing: (parent, args, context, info) => {
      console.log("mutation - do thing")
      console.log("args", args)
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
  console.log(`Server ready at ${url}`);
});
