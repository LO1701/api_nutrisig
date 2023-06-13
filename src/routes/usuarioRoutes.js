const express = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesUsuarios = express.Router();

routesUsuarios
    .post('/usuario/nutricionista', UsuarioController.criaUsuarioNutricionista) // depois do admin criar o usuario nutricionista, ela deve acessar essa rota para cadastrar sua senha
    .post('/usuario', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.criaUsuarioAdmin) // essa rota é destinada pro admin criar o acesso da nutricionista 
    .get('/usuario', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.buscaTodosUsuarios) // essa rota é destinada pro admin buscar todos os usuários 
    .get('/usuario/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.buscaUsuarioId) // essa rota é destinada pro admin buscar um usuário por id 
    .put('/usuario/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.atualizaUsuario) // essa rota é destinada pro admin atualizar os dados dos usuarios
    .put('/usuario/nutricionista/:id', AuthUsuario.verificaToken, UsuarioController.atualizaUsuario) // essa rota é destinada para a nutricionista atualizar os seus dados
    .delete('/usuario/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.deletaUsuario) // essa rota é destinada pro admin deletar usuários 

module.exports = routesUsuarios;