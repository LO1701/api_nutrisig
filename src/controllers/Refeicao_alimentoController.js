const Refeicao_alimentoServices = require("../services/Refeicao_alimentoServices");
const AlimentoServices = require("../services/AlimentoServices");
const refeicaoAlimentosServices = new Refeicao_alimentoServices();
const alimentoServices = new AlimentoServices();

class Refeicao_alimentoController { 

    static async criaRefeicao_alimento (req, res) {   
        const refeicaoAlimentoNovo = req.body;
        const id_alimentos = req.params.id_alimentos;
        const id_refeicoes = req.params.id_refeicoes;
        const id_plano = req.params.id_plano;
    
        refeicaoAlimentoNovo.id_refeicoes = id_refeicoes;
        refeicaoAlimentoNovo.id_plano = id_plano;
        refeicaoAlimentoNovo.id_alimentos = id_alimentos;

        const alimento = await pegaInformaçõesAlimento(id_alimentos);

        if(refeicaoAlimentoNovo.gramas === undefined){
            refeicaoAlimentoNovo.nome = alimento.nome;
            refeicaoAlimentoNovo.categoria = alimento.categoria;
            refeicaoAlimentoNovo.colesterol = alimento.colesterol;
            refeicaoAlimentoNovo.umidade = alimento.umidade;
            refeicaoAlimentoNovo.calorias_kcal = alimento.calorias_kcal;
            refeicaoAlimentoNovo.calorias_kj = alimento.calorias_kj;
            refeicaoAlimentoNovo.proteinas = alimento.proteinas;
            refeicaoAlimentoNovo.lipidios = alimento.lipidios;
            refeicaoAlimentoNovo.carboidratos = alimento.carboidratos;
            refeicaoAlimentoNovo.fibra_alimentar = alimento.fibra_alimentar;
            refeicaoAlimentoNovo.cinzas = alimento.cinzas;
            refeicaoAlimentoNovo.calcio = alimento.calcio;
            refeicaoAlimentoNovo.magnesio = alimento.magnesio;
            refeicaoAlimentoNovo.gramas = 100;
            refeicaoAlimentoNovo.observacoes = refeicaoAlimentoNovo.observacao;
        }else{
            alteraInformacoesAlimento(refeicaoAlimentoNovo.gramas)
        }

        function alteraInformacoesAlimento(gramas) {
            refeicaoAlimentoNovo.nome = alimento.nome; 
            refeicaoAlimentoNovo.categoria = alimento.categoria;

            if(alimento.colesterol === 'NA' || alimento.colesterol === 'Tr')
                refeicaoAlimentoNovo.colesterol = alimento.colesterol 
            else
                realizaCalculos(alimento.colesterol, gramas);

            refeicaoAlimentoNovo.umidade = realizaCalculos(alimento.umidade, gramas); 
            refeicaoAlimentoNovo.calorias_kcal = realizaCalculos(alimento.calorias_kcal, gramas); 
            refeicaoAlimentoNovo.calorias_kj = realizaCalculos(alimento.calorias_kj, gramas);
            refeicaoAlimentoNovo.proteinas = realizaCalculos(alimento.proteinas, gramas);
            refeicaoAlimentoNovo.lipidios = realizaCalculos(alimento.lipidios, gramas); 
            refeicaoAlimentoNovo.carboidratos = realizaCalculos(alimento.carboidratos, gramas);
            refeicaoAlimentoNovo.fibra_alimentar = realizaCalculos(alimento.fibra_alimentar, gramas);  
            refeicaoAlimentoNovo.cinzas = realizaCalculos(alimento.cinzas, gramas); 
            refeicaoAlimentoNovo.calcio = realizaCalculos(alimento.calcio, gramas); 
            refeicaoAlimentoNovo.magnesio = realizaCalculos(alimento.magnesio, gramas); 
            refeicaoAlimentoNovo.gramas = gramas;
            refeicaoAlimentoNovo.observacoes = refeicaoAlimentoNovo.observacao;
        }

        function realizaCalculos (informacao, gramas) {
            const valorGramasOriginal = 100;
            const alimento = Number(informacao)
            return (gramas * alimento) / valorGramasOriginal;
        }

        async function pegaInformaçõesAlimento(id) {
            const alimento = await alimentoServices.buscandoRegistroPorId(id);

            return alimento
        }

        try {          
            await refeicaoAlimentosServices.criaRegistro(refeicaoAlimentoNovo, {id_alimentos: id_alimentos,id_refeicoes: id_refeicoes, id_plano: id_plano});
            
            return res.status(201).json({msg: 'Alimento adicionado com sucesso'});
                
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodasRefeicoes_alimentos(req, res) {
        const id_refeicoes = req.params.id_refeicoes;
        const id_plano = req.params.id_plano;

        try {
            const planos = await refeicaoAlimentosServices.buscaRegistros({id_refeicoes: id_refeicoes, id_plano: id_plano});

            if(!planos)
                return res.status(404).json({msg: 'Alimentos não encontrados'});

            res.status(200).json(planos);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaRefeicoes_alimentosId(req, res) {
        const id = req.params.id
        const id_alimentos = req.params.id_alimentos;
        const id_refeicoes = req.params.id_refeicoes;
        const id_plano = req.params.id_plano;

        try {
            const plano = await refeicaoAlimentosServices.buscandoRegistroPorId(id, {id_alimentos: id_alimentos,id_refeicoes: id_refeicoes, id_plano: id_plano});

            if(!plano)
                return res.status(404).json({msg: 'Alimento não encontrados'});

            res.status(200).json(plano);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaRefeicoes_alimentos(req, res) {
        const refeicaoAlimentoNovo = req.body;
        const id_alimentos = req.params.id_alimentos;
        const id_refeicoes = req.params.id_refeicoes;
        const id_plano = req.params.id_plano;

        try {
            // const plano = await refeicaoAlimentosServices.buscandoRegistroPorId(id, {id_alimentos: id_alimentos,id_refeicoes: id_refeicoes, id_plano: id_plano});

            // if(!plano)
            //     return res.status(404).json({msg: 'Alimento não encontrado'});

            await refeicaoAlimentosServices.atualizaRefeicaoAlimento(refeicaoAlimentoNovo, {id_refeicoes: id_refeicoes, id_plano: id_plano});

            res.status(200).json({msg: 'Alimento atualizado com sucesso'});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaRefeicoes_alimentos(req, res) {
        const id = req.params.id
        const id_alimentos = req.params.id_alimentos;
        const id_refeicoes = req.params.id_refeicoes;
        const id_plano = req.params.id_plano;

        try {
            const plano = await refeicaoAlimentosServices.buscandoRegistroPorId(id, {id_alimentos: id_alimentos,id_refeicoes: id_refeicoes, id_plano: id_plano});

            if(!plano)
                return res.status(404).json({msg: 'Alimento não encontrados'});

            await refeicaoAlimentosServices.deletaRegistro(id, {id_alimentos: id_alimentos,id_refeicoes: id_refeicoes, id_plano: id_plano});

            res.status(200).json({msg: 'Alimento deletado com sucesso'});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = Refeicao_alimentoController;