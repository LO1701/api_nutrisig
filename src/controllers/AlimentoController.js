const AlimentoServices = require("../services/AlimentoServices");
const alimentoServices = new AlimentoServices();
require('dotenv').config();
class AlimentoController { 

    static async geraAlimentosNoBanco (id) { 
        await alimentoServices.criaAlimentos(id);
    }

    static async criaAlimento (req, res) {   
        const alimentoNovo = req.body;
        const idUser = req.params.idUser;

        alimentoNovo.id_usuario = idUser;

        try {
            
            await alimentoServices.criaRegistro(alimentoNovo, {id_usuario: idUser});

            res.status(201).json({msg: 'Alimento cadastrado com sucesso'});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodosAlimentos(req, res) {
        const id = req.params.idUser;

        try {
            const alimentos = await alimentoServices.buscaRegistros({id_usuario: id})

            res.status(200).json(alimentos);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaAlimentoId(req, res) {
        const idUser = req.params.idUser;
        const idAlimento = req.params.idAlimento;

        try {

            const alimento = await alimentoServices.buscandoRegistroPorId(idAlimento, {id_usuario: idUser})

            if(!alimento)
                return res.status(404).json({msg: 'Alimento não encontrado'});
            
            res.status(200).json(alimento);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaAlimento(req, res) {
        const propriedades = req.body;
        const idUser = req.params.idUser;
        const idAlimento = req.params.idAlimento;

        try {
            const alimento = await alimentoServices.buscandoRegistroPorId(idAlimento, {id_usuario: idUser})

            if(!alimento)
                return res.status(404).json({msg: 'Alimento não encontrado'});

            await alimentoServices.atualizaRegistro(propriedades, idAlimento, {id_usuario: idUser});

            res.status(200).json({msg: 'Alimento atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaAlimento(req, res) {
        const idUser = req.params.idUser;
        const idAlimento = req.params.idAlimento;
        try {
            const alimento = await alimentoServices.buscandoRegistroPorId(idAlimento, {id_usuario: idUser})

            if(!alimento)
                return res.status(404).json({msg: 'Alimento não encontrado'});

            await alimentoServices.deletaRegistro(idAlimento, {id_usuario: idUser});

            res.status(200).json({msg: 'Alimento deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = AlimentoController;