const ConsultaServices = require("../services/ConsultaServices");
const consultaServices = new ConsultaServices();

class ConsultaController { 

    static async criaConsulta (req, res) {   
        const consultaNova = req.body;
        const idPaciente = req.params.idPaciente;

        consultaNova.id_paciente = idPaciente;

        try {
            
            await consultaServices.criaRegistro(consultaNova, {id_paciente: idPaciente});
            
            const ultimaConsultaPaciente = await consultaServices.buscaRegistros({id_paciente: idPaciente});

            const enviarUltimaConsulta = ultimaConsultaPaciente.pop();
            console.log(enviarUltimaConsulta)

            res.status(201).json({msg: 'Consulta criada com sucesso', id: enviarUltimaConsulta.id});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodasConsultas(req, res) {
        const idPaciente = req.params.idPaciente;

        try {
            const pacientes = await consultaServices.buscaRegistros({id_paciente: idPaciente});

            res.status(200).json(pacientes);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaConsultaId(req, res) {
        const idConsulta = req.params.id;
        const idPaciente = req.params.idPaciente;

        try {
            const consultaProcurada = await consultaServices.buscandoRegistroPorId(idConsulta, {id_paciente:idPaciente});

            if(!consultaProcurada)
                return res.status(404).json({msg: 'Consulta não encontrada'});

            res.status(200).json(consultaProcurada);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaConsulta(req, res) {
        const propriedades = req.body;
        const idConsulta = req.params.id;
        const idPaciente = req.params.idPaciente;

        try {
            const consultaProcurada = await consultaServices.buscandoRegistroPorId(idConsulta, {id_paciente:idPaciente});

            if(!consultaProcurada)
                return res.status(404).json({msg: 'Consulta não encontrada'});

            await consultaServices.atualizaRegistro(propriedades, idConsulta, {id_paciente:idPaciente});

            res.status(200).json({msg: 'Consulta atualizada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaConsulta(req, res) {
        const idConsulta = req.params.id;
        const idPaciente = req.params.idPaciente;

        try {
            const consultaProcurada = await consultaServices.buscandoRegistroPorId(idConsulta, {id_paciente:idPaciente});

            if(!consultaProcurada)
                return res.status(404).json({msg: 'Consulta não encontrada'});

            await consultaServices.deletaRegistro(idConsulta, {id_paciente:idPaciente});

            res.status(200).json({msg: 'Consulta deletada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaUltimaConsultaCadastrada(req, res) {
        const idPaciente = req.params.idPaciente;

        try {
            const consulta = await consultaServices.buscaRegistros({id_paciente: idPaciente});
                    
            if(consulta.length > 0){
                const ultimaConsulta = consulta.pop();
                return res.status(200).json(ultimaConsulta);
            }else{
                return res.status(200).json(consulta);
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = ConsultaController;