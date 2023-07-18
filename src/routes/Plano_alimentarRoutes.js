const express = require('express');
const Plano_alimentarController = require('../controllers/plano_alimentarController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesPlano_alimentar = express.Router();

routesPlano_alimentar
    .post('/usuario/paciente/:id_paciente/consulta/:id_consulta/plano', AuthUsuario.verificaToken, Plano_alimentarController.criaPlano) 
    .get('/usuario/paciente/:id_paciente/consulta/:id_consulta/plano', AuthUsuario.verificaToken, Plano_alimentarController.buscaTodosPlanos)  
    .get('/usuario/paciente/:id_paciente/consulta/:id_consulta/plano/ultimo', AuthUsuario.verificaToken, Plano_alimentarController.buscaUltimoPlanoCadastrado)  
    .get('/usuario/paciente/consulta/:id_consulta/plano/:id', AuthUsuario.verificaToken, Plano_alimentarController.buscaPlanoId)   
    .put('/usuario/paciente/consulta/:id_consulta/plano/:id', AuthUsuario.verificaToken, Plano_alimentarController.atualizaPlano)   
    .delete('/usuario/paciente/consulta/:id_consulta/plano/:id', AuthUsuario.verificaToken, Plano_alimentarController.deletaPlano)  

module.exports = routesPlano_alimentar;