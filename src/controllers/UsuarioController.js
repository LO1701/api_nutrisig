const UsuarioServices = require("../services/UsuarioServices");
const Alimentocontroller = require("../controllers/AlimentoController");
const usuarioServices = new UsuarioServices();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

class UsuarioController {
    static async criaUsuarioAdmin (req, res) {
// Essa função tem por objetivo o admin criar o acesso da nutricionista. Por isso então
// os dados nome, email, senha e role são cadastrados
// ******O que eu ainda tenho que fazer aqui é a pag html do email******
        
        const novoUsuario = req.body;

        try {
            const usuarioProcurado = await usuarioServices.procuraRegistroEmail(novoUsuario.email);

            if(usuarioProcurado)
                return res.status(400).json({msg: 'Email já cadastrado'});

            if(novoUsuario.senha !== novoUsuario.confirmaSenha)
                return res.status(400).json({msg: 'Senhas Diferentes'});
            
            const acrescentaSenha = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(novoUsuario.senha, acrescentaSenha);
            
            novoUsuario.senha = senhaHash;
            
            await usuarioServices.criaRegistro(novoUsuario);

            const usuarioCriado = await usuarioServices.procuraRegistroEmail(novoUsuario.email);

            encaminhandoEmail(usuarioCriado.email);

            Alimentocontroller.geraAlimentosNoBanco(usuarioCriado.id);
                
            res.status(201).json({msg: 'Usuario criado com sucesso'});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }

        function encaminhandoEmail(emailUsuario){
            const transport = nodemailer.createTransport({
                host: process.env.NODEMAILER_HOST,
                port: Number(process.env.NODEMAILER_port),
                secure: process.env.NODEMAILER_SECURE,
                auth:{
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            });

            transport.sendMail({
                from: 'Viva Bem',
                to: `${emailUsuario}`,
                subject: 'Finalização do cadastro',
                //html: '',
                text: 'Olá seu cadastro no sistema foi realizado com sucesso. Para realizar o primeiro acesso clique no link http://localhost:5000/usuario/nutricionista' //caso o html não seja renderizado envia o texto
            }).then(() => console.log('Email enviado'))
              .catch((error) => console.log(error));
        }
    } 

    static async criaUsuarioNutricionista (req, res) {
// Essa função tem por objetivo modificar a senha da nutricionista, que foi criada na função 
// criaUsuarioAdmin(). Por isso será verificado primeiro o email cadastrado e a senha cadastrada
// pelo admin. Se tudo estiver ok a nutricionista poderá alterar a senha
        
        const nutricionista = req.body;

        try {
            const usuarioProcurado = await usuarioServices.procuraRegistroEmail(nutricionista.email);

            if(!usuarioProcurado)
                return res.status(404).json({msg: 'Email não cadastrado'});

            const verificandoSenha = await bcrypt.compare(nutricionista.senha, usuarioProcurado.senha);

            if(!verificandoSenha)
                return res.status(400).json("Senha ou email incorreto");
            
            const acrescentaSenha = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(nutricionista.novaSenha, acrescentaSenha);
            
            nutricionista.senha = senhaHash;
            
            await usuarioServices.atualizaRegistro(nutricionista, usuarioProcurado.id);

            res.status(201).json({msg: 'Senha alterada com sucesso'});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodosUsuarios(req, res) {

        try {
            const usuarios = await usuarioServices.buscaRegistros();

            res.status(200).json(usuarios);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaUsuarioId(req, res) {
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioServices.buscandoRegistroPorId(id);

            if(!usuarioProcurado)
                return res.status(404).json({msg: 'Usuário não encontrado'});

            res.status(200).json(usuarioProcurado);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaUsuario(req, res) {
        const propriedades = req.body;
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioServices.buscandoRegistroPorId(id);

            if(!usuarioProcurado)
                return res.status(404).json({msg: 'Usuário não encontrado'});

            await usuarioServices.atualizaRegistro(propriedades, id);

            res.status(200).json({msg: 'Usuário atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaUsuario(req, res) {
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioServices.buscandoRegistroPorId(id);

            if(!usuarioProcurado)
                return res.status(404).json({msg: 'Usuário não encontrado'});

            await usuarioServices.deletaRegistro(id);

            res.status(200).json({msg: 'Usuário deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = UsuarioController;