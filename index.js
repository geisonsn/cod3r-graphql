const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  scalar Date

  type Query {
    hello: String
    dataAtual: Date
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello world!';
    },
    dataAtual() {
      return new Date().toISOString();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
