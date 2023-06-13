const express = require('express');
const Exame_laboratorialController = require('../controllers/Exame_laboratorialController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesExame_laboratorial = express.Router();

routesExame_laboratorial
    .post('/usuario/paciente/consulta/:idConsulta/exame', AuthUsuario.verificaToken, Exame_laboratorialController.criaExame) 
    .get('/usuario/paciente/consulta/:idConsulta/exame', AuthUsuario.verificaToken, Exame_laboratorialController.buscaTodosExames)  
    .get('/usuario/paciente/consulta/:idConsulta/exame/:id', AuthUsuario.verificaToken, Exame_laboratorialController.buscaExamesId)   
    .put('/usuario/paciente/consulta/:idConsulta/exame/:id', AuthUsuario.verificaToken, Exame_laboratorialController.atualizaExame)   
    .delete('/usuario/paciente/consulta/:idConsulta/exame/:id', AuthUsuario.verificaToken, Exame_laboratorialController.deletaExame)  

module.exports = routesExame_laboratorial;