const express = require('express');
const AlimentoController = require('../controllers/AlimentoController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesAlimentos = express.Router();

routesAlimentos
    .post('/usuario/:idUser/alimento', AuthUsuario.verificaToken, AlimentoController.criaAlimento) 
    .get('/usuario/:idUser/alimento', AuthUsuario.verificaToken, AlimentoController.buscaTodosAlimentos)  
    .get('/usuario/:idUser/alimento/:idAlimento', AuthUsuario.verificaToken, AlimentoController.buscaAlimentoId)   
    .put('/usuario/:idUser/alimento/:idAlimento', AuthUsuario.verificaToken, AlimentoController.atualizaAlimento)   
    .delete('/usuario/:idUser/alimento/:idAlimento', AuthUsuario.verificaToken, AlimentoController.deletaAlimento)  

module.exports = routesAlimentos;