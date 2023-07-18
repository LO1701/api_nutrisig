const express = require('express');
const ConsultaController = require('../controllers/ConsultaController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesConsultas = express.Router();

routesConsultas
    .post('/usuario/paciente/:idPaciente/consulta', AuthUsuario.verificaToken, ConsultaController.criaConsulta) 
    .get('/usuario/paciente/:idPaciente/consulta', AuthUsuario.verificaToken, ConsultaController.buscaTodasConsultas)  
    .get('/usuario/paciente/:idPaciente/consulta/ultima', AuthUsuario.verificaToken, ConsultaController.buscaUltimaConsultaCadastrada)  
    .get('/usuario/paciente/:idPaciente/consulta/:id', AuthUsuario.verificaToken, ConsultaController.buscaConsultaId)   
    .put('/usuario/paciente/:idPaciente/consulta/:id', AuthUsuario.verificaToken, ConsultaController.atualizaConsulta)   
    .delete('/usuario/paciente/:idPaciente/consulta/:id', AuthUsuario.verificaToken, ConsultaController.deletaConsulta)  

module.exports = routesConsultas;