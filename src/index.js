const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { usuarios, perfis } = require('./data/db');

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

const server = new ApolloServer({ 
  typeDefs: importSchema('./src/schema/index.graphql'), 
  resolvers 
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
