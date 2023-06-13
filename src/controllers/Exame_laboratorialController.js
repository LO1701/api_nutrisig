const Exame_laboratorial = require("../services/Exame_laboratorial");
const exameServices = new Exame_laboratorial();

class Exame_laboratorialController { 

    static async criaExame (req, res) {   
        const exameNovo = req.body;
        const id_consultaExame = req.params.idConsulta;

        exameNovo.id_consultaExame = id_consultaExame;

        try {
            
            await exameServices.criaRegistro(exameNovo, {id_consultaExame: id_consultaExame});

            res.status(201).json({msg: 'Exame adicionado com sucesso'});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodosExames(req, res) {
        const id_consultaExame = req.params.idConsulta;

        try {
            const exames = await exameServices.buscaRegistros({id_consultaExame: id_consultaExame});

            res.status(200).json(exames);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaExamesId(req, res) {
        const idExame = req.params.id;
        const id_consultaExame = req.params.idConsulta;

        try {
            const exameProcurado = await exameServices.buscandoRegistroPorId(idExame, {id_consultaExame:id_consultaExame});

            if(!exameProcurado)
                return res.status(404).json({msg: 'Exame não encontrado'});

            res.status(200).json(exameProcurado);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaExame(req, res) {
        const propriedades = req.body;
        const idExame = req.params.id;
        const id_consultaExame = req.params.idConsulta;

        try {
            const exameProcurado = await exameServices.buscandoRegistroPorId(idExame, {id_consultaExame:id_consultaExame});

            if(!exameProcurado)
                return res.status(404).json({msg: 'Exame não encontrado'});

            await exameServices.atualizaRegistro(propriedades, idExame, {id_consultaExame:id_consultaExame});

            res.status(200).json({msg: 'Exame atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaExame(req, res) {
        const idExame = req.params.id;
        const id_consultaExame = req.params.idConsulta;

        try {
            const exameProcurado = await exameServices.buscandoRegistroPorId(idExame, {id_consultaExame:id_consultaExame});

            if(!exameProcurado)
                return res.status(404).json({msg: 'Exame não encontrado'});

            await exameServices.deletaRegistro(idExame, {id_consultaExame:id_consultaExame});

            res.status(200).json({msg: 'Exame deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = Exame_laboratorialController;