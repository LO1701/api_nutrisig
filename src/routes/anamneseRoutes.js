const express = require('express');
const AnamneseController = require('../controllers/AnamneseController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const routesAnamnese = express.Router();

routesAnamnese
    .post('/usuario/paciente/consulta/:id_consultaAnamnese/anamnese', AuthUsuario.verificaToken, AnamneseController.criaAnamnese) 
    .get('/usuario/paciente/consulta/:id_consultaAnamnese/anamnese', AuthUsuario.verificaToken, AnamneseController.buscaTodasAnamneses)  
    .get('/usuario/paciente/consulta/:id_consultaAnamnese/anamnese/:id', AuthUsuario.verificaToken, AnamneseController.buscaAnamneseId)   
    .put('/usuario/paciente/consulta/:id_consultaAnamnese/anamnese', AuthUsuario.verificaToken, AnamneseController.atualizaAnamnese)   
    .delete('/usuario/paciente/consulta/:id_consultaAnamnese/anamnese/:id', AuthUsuario.verificaToken, AnamneseController.deletaAnamnese)  

module.exports = routesAnamnese;