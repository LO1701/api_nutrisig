const express = require('express');
const Medida_antropometricaController = require('../controllers/Medida_antropometricaController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesMedida_antropometrica = express.Router();

routesMedida_antropometrica
    .post('/usuario/paciente/consulta/:idConsulta/medida', AuthUsuario.verificaToken, Medida_antropometricaController.criaMedida) 
    .get('/usuario/paciente/consulta/:idConsulta/medida', AuthUsuario.verificaToken, Medida_antropometricaController.buscaTodasMedidas)  
    .get('/usuario/paciente/consulta/:idConsulta/medida/ultima', AuthUsuario.verificaToken, Medida_antropometricaController.buscaUltimaMedidaCadastrada)  
    .get('/usuario/paciente/consulta/:idConsulta/medida/:id', AuthUsuario.verificaToken, Medida_antropometricaController.buscaMedidaId)   
    .put('/usuario/paciente/consulta/:idConsulta/medida/:id', AuthUsuario.verificaToken, Medida_antropometricaController.atualizaMedida)   
    .delete('/usuario/paciente/consulta/:idConsulta/medida/:id', AuthUsuario.verificaToken, Medida_antropometricaController.deletaMedida)  

module.exports = routesMedida_antropometrica;