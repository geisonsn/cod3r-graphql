const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    hello: String
    dataAtual: String
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
