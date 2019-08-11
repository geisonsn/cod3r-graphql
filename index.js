const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

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
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      return produto.preco - (produto.preco * produto.desconto);
    }
  },
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
        nome: 'Sofia Cavalcante do Nascimento',
        email: 'sophia@gmail.com',
        idade: 15,
        salario_real: 1000.00,
        vip: true 
      };
    },
    produtoEmDestaque() {
      return {
        nome: 'Ebook Graphql',
        preco: 49.0,
        desconto: 0.1
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
