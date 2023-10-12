const AnamneseServices = require("../services/AnamneseServices");
const anamneseServices = new AnamneseServices();

class AnamneseController { 

    static async criaAnamnese (req, res) {   
        const anamneseNova = req.body;
        const id_consultaAnamnese = req.params.id_consultaAnamnese;

        anamneseNova.id_consultaAnamnese = id_consultaAnamnese;

        try {
            await anamneseServices.criaAnamneses(anamneseNova, id_consultaAnamnese);

            res.status(201).json({msg: 'Anamnese adicionada com sucesso'});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodasAnamneses(req, res) {
        const id_consultaAnamnese = req.params.id_consultaAnamnese;

        try {
            const anamneses = await anamneseServices.buscaRegistros({id_consultaAnamnese: id_consultaAnamnese});

            res.status(200).json(anamneses);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaAnamneseId(req, res) {
        const idAnamnese = req.params.id;
        const id_consultaAnamnese = req.params.id_consultaAnamnese;

        try {
            const anamneseProcurada = await anamneseServices.buscandoRegistroPorId(idAnamnese, {id_consultaAnamnese:id_consultaAnamnese});

            if(!anamneseProcurada)
                return res.status(404).json({msg: 'Anamnese não encontrada'});

            res.status(200).json(anamneseProcurada);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaAnamnese(req, res) {
        const propriedades = req.body;
        const id_consultaAnamnese = req.params.id_consultaAnamnese;

        try {

            await anamneseServices.atualizaAnamneses(propriedades, id_consultaAnamnese);

            res.status(200).json({msg: 'Anamnese atualizada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaAnamnese(req, res) {
        const idAnamnese = req.params.id;
        const id_consultaAnamnese = req.params.id_consultaAnamnese;

        try {
            const anamneseProcurada = await anamneseServices.buscandoRegistroPorId(idAnamnese, {id_consultaAnamnese:id_consultaAnamnese});

            if(!anamneseProcurada)
                return res.status(404).json({msg: 'Anamnese não encontrada'});

            await anamneseServices.deletaRegistro(idAnamnese, {id_consultaAnamnese:id_consultaAnamnese});

            res.status(200).json({msg: 'Anamnese deletada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = AnamneseController;