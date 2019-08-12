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
    perfil_id: 1,
    status: 'ATIVO' 
  }, 
  { 
    id: 2,
    nome: 'Maria de Albuquerque',
    email: 'malbuquerque@gmail.com',
    idade: 30,
    perfil_id: 2,
    status: 'INATIVO'
  }, 
  { 
    id: 3, 
    nome: 'José Maria da Silva',
    email: 'jmsilva@gmail.com',
    idade: 39,
    perfil_id: 1,
    status: 'BLOQUEADO'
  }
];

module.exports = {usuarios, perfis};
