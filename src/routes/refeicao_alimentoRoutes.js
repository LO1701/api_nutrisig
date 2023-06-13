const express = require('express');
const refeicao_alimentoController = require('../controllers/Refeicao_alimentoController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesRefeicao_alimento = express.Router();

routesRefeicao_alimento
    .post('/usuario/plano/:id_plano/refeicao/:id_refeicoes/alimento/:id_alimentos/refeicaoAlimento', AuthUsuario.verificaToken, refeicao_alimentoController.criaRefeicao_alimento) 
    .get('/usuario/plano/:id_plano/refeicao/:id_refeicoes/alimento/:id_alimentos/refeicaoAlimento', AuthUsuario.verificaToken, refeicao_alimentoController.buscaTodasRefeicoes_alimentos)  
    .get('/usuario/plano/:id_plano/refeicao/:id_refeicoes/alimento/:id_alimentos/refeicaoAlimento/:id', AuthUsuario.verificaToken, refeicao_alimentoController.buscaRefeicoes_alimentosId)   
    .put('/usuario/plano/:id_plano/refeicao/:id_refeicoes/alimento/:id_alimentos/refeicaoAlimento/:id', AuthUsuario.verificaToken, refeicao_alimentoController.atualizaRefeicoes_alimentos)   
    .delete('/usuario/plano/:id_plano/refeicao/:id_refeicoes/alimento/:id_alimentos/refeicaoAlimento/:id', AuthUsuario.verificaToken, refeicao_alimentoController.deletaRefeicoes_alimentos)  

module.exports = routesRefeicao_alimento;