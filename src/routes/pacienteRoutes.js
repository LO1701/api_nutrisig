const express = require('express');
const PacienteController = require('../controllers/PacienteController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesPacientes = express.Router();

routesPacientes
    .post('/usuario/:idUser/paciente', AuthUsuario.verificaToken, PacienteController.criaPaciente) // depois do admin criar o usuario nutricionista, ela deve acessar essa rota para cadastrar sua senha
    .get('/usuario/:idUser/paciente', AuthUsuario.verificaToken, PacienteController.buscaTodosPacientes) // essa rota é destinada pro admin buscar todos os usuários 
    .get('/usuario/:idUser/paciente/:id', AuthUsuario.verificaToken, PacienteController.buscaPacienteId) // essa rota é destinada pro admin buscar um usuário por id 
    .put('/usuario/:idUser/paciente/:id', AuthUsuario.verificaToken, PacienteController.atualizaPaciente) // essa rota é destinada pro admin atualizar os dados dos usuarios
    .delete('/usuario/:idUser/paciente/:id', AuthUsuario.verificaToken, PacienteController.deletaPaciente) // essa rota é destinada pro admin deletar usuários 

module.exports = routesPacientes;