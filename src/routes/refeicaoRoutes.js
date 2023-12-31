const express = require('express');
const RefeicaoController = require('../controllers/RefeicaoController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesRefeicao = express.Router();

routesRefeicao
    .post('/usuario/:idUsuario/paciente/consulta/plano/:id_planoAlimentar/refeicao', AuthUsuario.verificaToken, RefeicaoController.criaRefeicao) 
    .get('/usuario/:idUsuario/paciente/consulta/plano/:id_planoAlimentar/refeicao', AuthUsuario.verificaToken, RefeicaoController.buscaTodasRefeicoes)  
    .get('/usuario/:idUsuario/paciente/logado/consulta/plano/:id_planoAlimentar/refeicao', RefeicaoController.buscaTodasRefeicoes) //essa rota serve para encaminhar as refeicoes do paciente quando ele faz o login (com o CPF) 
    .get('/usuario/:idUsuario/paciente/consulta/plano/:id_planoAlimentar/refeicao/:id', AuthUsuario.verificaToken, RefeicaoController.buscaRefeicaoId)   
    .put('/usuario/:idUsuario/paciente/consulta/plano/:id_planoAlimentar/refeicao/:id', AuthUsuario.verificaToken, RefeicaoController.atualizaRefeicao)   
    .delete('/usuario/:idUsuario/paciente/consulta/plano/:id_planoAlimentar/refeicao/:id', AuthUsuario.verificaToken, RefeicaoController.deletaRefeicao)  

module.exports = routesRefeicao;