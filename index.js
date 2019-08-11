const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Pontos de entrada da API
  type Query {
    hello: String
    dataAtual: Date
    usuarioLogado: Usuario
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    }
  },
  Query: {
    hello() {
      return 'Hello world!';
    },
    dataAtual() {
      return new Date().toISOString();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Sofia Cavalcante Nascimento',
        email: 'sophia@gmail.com',
        idade: 15,
        salario_real: 1000.00,
        vip: true 
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
