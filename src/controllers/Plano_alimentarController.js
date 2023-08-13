const Plano_alimentarServices = require("../services/plano_alimentarServices");
const planoServices = new Plano_alimentarServices();

class Plano_alimentarController { 

    static async criaPlano (req, res) {   
        const planoNovo = req.body;
        const id_consultaPlano = req.params.id_consulta;
        const id_pacientePlanoAlimentar = req.params.id_paciente;
        
        planoNovo.id_consultaPlano = id_consultaPlano;
        planoNovo.id_pacientePlanoAlimentar = id_pacientePlanoAlimentar;

        try {          
            await planoServices.criaRegistro(planoNovo, {id_consultaPlano: id_consultaPlano, id_pacientePlanoAlimentar: id_pacientePlanoAlimentar});
            
            const IdplanoNovo = await planoServices.buscaRegistros({id_consultaPlano: id_consultaPlano, id_pacientePlanoAlimentar: id_pacientePlanoAlimentar});
            
            const ultimoIdplanoNovo = IdplanoNovo.pop();

            return res.status(201).json({msg: "Plano alimentar criado com sucesso", id: ultimoIdplanoNovo.id});
                
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodosPlanos(req, res) {
        const id_consultaPlano = req.params.id_consulta;
        const id_pacientePlanoAlimentar = req.params.id_paciente;

        try {
            const planos = await planoServices.buscaRegistros({id_consultaPlano: id_consultaPlano, id_pacientePlanoAlimentar: id_pacientePlanoAlimentar});

            res.status(200).json(planos);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaPlanoId(req, res) {
        const idPlano = req.params.id;
        const id_consultaPlano = req.params.id_consulta;

        try {
            const planoProcurado = await planoServices.buscandoRegistroPorId(idPlano, {id_consultaPlano:id_consultaPlano});

            if(!planoProcurado)
                return res.status(404).json({msg: 'Plano alimentar não encontrado'});

            res.status(200).json(planoProcurado);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaPlano(req, res) {
        const propriedades = req.body;
        const idPlano = req.params.id;
        const id_consultaPlano = req.params.id_consulta;

        try {

            const planoProcurado = await planoServices.buscandoRegistroPorId(idPlano, {id_consultaPlano:id_consultaPlano});

            if(!planoProcurado)
                return res.status(404).json({msg: 'Plano alimentar não encontrado'});

            await planoServices.atualizaRegistro(propriedades, idPlano, {id_consultaPlano:id_consultaPlano});

            res.status(200).json({msg: 'Plano alimentar atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaPlano(req, res) {
        const idPlano = req.params.id;
        const id_consultaPlano = req.params.id_consulta;

        try {
            const planoProcurado = await planoServices.buscandoRegistroPorId(idPlano, {id_consultaPlano:id_consultaPlano});

            if(!planoProcurado)
                return res.status(404).json({msg: 'Plano alimentar não encontrado'});

            await planoServices.deletaRegistro(idPlano, {id_consultaPlano:id_consultaPlano});

            res.status(200).json({msg: 'Plano alimentar deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaUltimoPlanoCadastrado(req, res) {
        const id_consultaPlano = req.params.id_consulta;
        const id_pacientePlanoAlimentar = req.params.id_paciente;

        try {
            const planos = await planoServices.buscaRegistros({id_consultaPlano: id_consultaPlano, id_pacientePlanoAlimentar: id_pacientePlanoAlimentar});

            if(planos.length > 0){
                const ultimoPlano = planos.pop();

                return res.status(200).json(ultimoPlano);
            }else{
                return res.status(200).json(planos);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = Plano_alimentarController;