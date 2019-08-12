const { ApolloServer, gql } = require('apollo-server');

const usuarios = [
  {
    id: 1,
    nome: 'Bernardo Cavalcante do Nascimento',
    email: 'bernardocn@gmail.com',
    idade: 20
  },
  {
    id: 2,
    nome: 'Maria de Albuquerque',
    email: 'malbuquerque@gmail.com',
    idade: 30
  },
  {
    id: 3,
    nome: 'José Maria da Silva',
    email: 'jmsilva@gmail.com',
    idade: 39
  }
];

const typeDefs = gql`

  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: Int
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
    usuarios: [Usuario]
    usuario(id: Int): Usuario
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
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, args) {
      return usuarios.find(usuario => usuario.id === args.id);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
