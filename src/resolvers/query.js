const { usuarios, perfis } = require('../data/db');

module.exports = {
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