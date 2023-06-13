const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const authRoutes = express.Router();

authRoutes.post('/login', AuthController.login);
authRoutes.get('/session', AuthUsuario.verificaToken, AuthController.getSession);


module.exports = authRoutes;