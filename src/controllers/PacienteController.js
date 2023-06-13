const PacienteServices = require("../services/PacienteServices");
const UsuarioServices = require("../services/UsuarioServices");
const pacienteServices = new PacienteServices();
const usuarioServices = new UsuarioServices();
const nodemailer = require('nodemailer');
require('dotenv').config();


class PacienteController { 

    static async criaPaciente (req, res) {   
        const pacienteNovo = req.body;
        const idUser = req.params.idUser;

        pacienteNovo.id_usuario = idUser;

        try {
            const emailProcurado = await pacienteServices.procuraRegistroEmail(pacienteNovo.email);

            if(emailProcurado)
                return res.status(404).json({msg: 'Email já cadastrado'});
            
            await pacienteServices.criaRegistro(pacienteNovo, {id_usuario: idUser});

            res.status(201).json({msg: 'Paciente criado com sucesso'});
            
            if(pacienteNovo.email)
                encaminhandoEmail(pacienteNovo.email);

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
                subject: 'Seja bem-vindo ao Viva Bem',
                //html: '',
                text: 'Olá seja bem-vindo ao Viva Bem. Para ter acesso ao App, primeiro você deve baixar o App e para ter acesso siga os seguintes passos:' //caso o html não seja renderizado envia o texto
            }).then(() => console.log('Email enviado'))
              .catch((error) => console.log(error));
        }
    }

    static async buscaTodosPacientes(req, res) {
        const id = req.params.idUser;
        let pacientes = null;
        
        try {
            const usuarioLogado = await usuarioServices.buscandoRegistroPorId(id);
         
            if(usuarioLogado.role === 'admin')
                pacientes = await pacienteServices.buscaRegistros();
            else
                pacientes = await pacienteServices.buscaRegistros({id_usuario: id});

            res.status(200).json(pacientes);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaPacienteId(req, res) {
        const idPaciente = req.params.id;
        const idUser = req.params.idUser;
        let pacienteProcurado = null;

        try {

            const usuarioLogado = await usuarioServices.buscandoRegistroPorId(idUser);

            if(usuarioLogado.role === 'admin')
                pacienteProcurado = await pacienteServices.buscandoRegistroPorId(idPaciente);
            else
                pacienteProcurado = await pacienteServices.buscandoRegistroPorId(idPaciente, {id_usuario:idUser});

            if(!pacienteProcurado)
                return res.status(404).json({msg: 'Paciente não encontrado'});

            res.status(200).json(pacienteProcurado);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaPaciente(req, res) {
        const propriedades = req.body;
        const idPaciente = req.params.id;
        const idUser = req.params.idUser;

        try {
            const pacienteProcurado = await pacienteServices.buscandoRegistroPorId(idPaciente, {id_usuario:idUser});
            
            if(!pacienteProcurado)
                return res.status(404).json({msg: 'Paciente não encontrado'});

            await pacienteServices.atualizaRegistro(propriedades, idPaciente, {id_usuario:idUser});

            res.status(200).json({msg: 'Paciente atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaPaciente(req, res) {
        const idPaciente = req.params.id;
        const idUser = req.params.idUser;

        try {
            const pacienteProcurado = await pacienteServices.buscandoRegistroPorId(idPaciente, {id_usuario:idUser});

            if(!pacienteProcurado)
                return res.status(404).json({msg: 'Paciente não encontrado'});

            await pacienteServices.deletaRegistro(idPaciente, {id_usuario:idUser});

            res.status(200).json({msg: 'Paciente deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = PacienteController;