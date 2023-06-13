const AuthServices = require('../services/AuthServices');
const authServices = new AuthServices();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

class AuthController{
    static async login(req, res){
        const { email, senha } = req.body;

        try {
            const usuarioProcurado = await authServices.procuraRegistroEmail(email);

            if(!usuarioProcurado)
                return res.status(404).json({msg: 'Email não cadastrado'});

            const verificandoSenha = await bcrypt.compare(senha, usuarioProcurado.senha);

            if(!verificandoSenha)
                return res.status(400).json("Senha incorreta");
            
            const secret = process.env.SECRET;

            const access_token = jwt.sign({
                id: usuarioProcurado.id
            },
                 secret
            // {
            //     expiresIn: '15m'
            // }
            );

            res.status(200).json({msg: "Autenticação realizada com sucesso", access_token});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'}); 
        }
    }

    static async getSession(req, res){
        const authHeader = req.headers['authorization'];

        const decodificado =  jwt_decode(authHeader);

        try {
            const usuarioProcurado = await authServices.buscaUsuario(decodificado.id);
        
            res.status(200).json(usuarioProcurado);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }   
    }

    static async logOut(req, res){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        try {
            
        
            res.status(200).json(usuarioProcurado);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }   
    }
}

module.exports = AuthController;