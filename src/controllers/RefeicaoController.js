const RefeicaoServices = require("../services/RefeicaoServices");
const refeicaoServices = new RefeicaoServices();

class RefeicaoController { 

    static async criaRefeicao (req, res) {   
        const RefeicaoNova = req.body;
        const id_planoAlimentar = req.params.id_planoAlimentar;
        const id_usuario = req.params.idUsuario
        
        RefeicaoNova.id_planoAlimentar = id_planoAlimentar;
        RefeicaoNova.id_usuario = id_usuario;

        try {          
            await refeicaoServices.criaRegistro(RefeicaoNova, {id_planoAlimentar: id_planoAlimentar, id_usuario: id_usuario});
            
            return res.status(201).json({msg: "Refeição criada com sucesso"});
                
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodasRefeicoes(req, res) {
        const id_planoAlimentar = req.params.id_planoAlimentar;
        const id_usuario = req.params.idUsuario

        try {
            const refeicoes = await refeicaoServices.buscaRegistros({id_planoAlimentar: id_planoAlimentar, id_usuario: id_usuario});

            res.status(200).json(refeicoes);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaRefeicaoId(req, res) {
        const idRefeicao = req.params.id;
        const id_planoAlimentar = req.params.id_planoAlimentar;
        const id_usuario = req.params.idUsuario

        try {
            const refeicaoProcurada = await refeicaoServices.buscandoRegistroPorId(idRefeicao, {id_planoAlimentar:id_planoAlimentar, id_usuario: id_usuario});

            if(!refeicaoProcurada)
                return res.status(404).json({msg: 'Refeição não encontrada'});

            res.status(200).json(refeicaoProcurada);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaRefeicao(req, res) {
        const propriedades = req.body;
        const idRefeicao = req.params.id;
        const id_planoAlimentar = req.params.id_planoAlimentar;
        const id_usuario = req.params.idUsuario

        try {

            const refeicaoProcurada = await refeicaoServices.buscandoRegistroPorId(idRefeicao, {id_planoAlimentar:id_planoAlimentar, id_usuario: id_usuario});

            if(!refeicaoProcurada)
                return res.status(404).json({msg: 'Refeição não encontrada'});

            await refeicaoServices.atualizaRegistro(propriedades, idRefeicao, {id_planoAlimentar:id_planoAlimentar, id_usuario: id_usuario});

            res.status(200).json({msg: 'Refeição atualizada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaRefeicao(req, res) {
        const idRefeicao = req.params.id;
        const id_planoAlimentar = req.params.id_planoAlimentar;
        const id_usuario = req.params.idUsuario

        try {
            const refeicaoProcurada = await refeicaoServices.buscandoRegistroPorId(idRefeicao, {id_planoAlimentar:id_planoAlimentar, id_usuario: id_usuario});

            if(!refeicaoProcurada)
                return res.status(404).json({msg: 'Refeição não encontrada'});

            await refeicaoServices.deletaRegistro(idRefeicao, {id_planoAlimentar:id_planoAlimentar, id_usuario: id_usuario});

            res.status(200).json({msg: 'Refeição deletada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = RefeicaoController;