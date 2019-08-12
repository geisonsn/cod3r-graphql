const { ApolloServer, gql } = require('apollo-server');

const perfis = [
  {id: 1, nome: 'comum'},
  {id: 2, nome: 'administrador'}
];

const usuarios = [
  {
    id: 1,
    nome: 'Bernardo Cavalcante do Nascimento',
    email: 'bernardocn@gmail.com',
    idade: 20,
    perfil_id: 1
  },
  {
    id: 2,
    nome: 'Maria de Albuquerque',
    email: 'malbuquerque@gmail.com',
    idade: 30,
    perfil_id: 2
  },
  {
    id: 3,
    nome: 'José Maria da Silva',
    email: 'jmsilva@gmail.com',
    idade: 39,
    perfil_id: 1
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

  type Perfil {
    id: Int
    nome: String
  }

  type Usuario {
    id: Int
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    perfil: Perfil
  }

  # Pontos de entrada da API
  type Query {
    hello: String
    dataAtual: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    usuarios: [Usuario]
    usuario(id: Int): Usuario
    perfis: [Perfil]
    perfil(id: Int): Perfil
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
    },
    perfil(usuario) {
      return perfis.find(perfil => perfil.id === usuario.perfil_id)
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
    usuario(_, { id }) {
      return usuarios.find(usuario => usuario.id === id);
    },
    perfis() {
      return perfis
    },
    perfil(_, { id }) {
      return perfis.find(perfil => perfil.id === id);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
