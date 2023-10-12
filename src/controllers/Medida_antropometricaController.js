const Medida_antropometricaServices = require("../services/Medida_antropometricaServices");
const medidaServices = new Medida_antropometricaServices();

class Medida_antropometricaController { 

    static async criaMedida (req, res) {   
        const medidaNova = req.body;
        const id_consultaMedida = req.params.idConsulta;
        
        medidaNova.id_consultaMedida = id_consultaMedida;
        const calculoImcECaracteriscas = medidaServices.calculaImc(Number(medidaNova.peso_atual), Number(medidaNova.altura));
        medidaNova.imc_atual = calculoImcECaracteriscas.imc.toFixed(2);
        medidaNova.classificacao_imc = calculoImcECaracteriscas.caracteristica;

        try {          
            await medidaServices.criaRegistro(medidaNova, {id_consultaMedida: id_consultaMedida});

            const medidas = await medidaServices.buscaRegistros({id_consultaMedida: id_consultaMedida});

            if(medidas.length > 0){
                const ultimaMedidaCadastrada = medidas.pop();
                
                return res.status(200).json(ultimaMedidaCadastrada);
            }else{
                return res.status(200).json(medidas);
            }
                
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaTodasMedidas(req, res) {
        const id_consultaMedida = req.params.idConsulta;

        try {
            const medidas = await medidaServices.buscaRegistros({id_consultaMedida: id_consultaMedida});

            res.status(200).json(medidas);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaMedidaId(req, res) {
        const idMedida = req.params.id;
        const id_consultaMedida = req.params.idConsulta;

        try {
            const medidaProcurada = await medidaServices.buscandoRegistroPorId(idMedida, {id_consultaMedida:id_consultaMedida});

            if(!medidaProcurada)
                return res.status(404).json({msg: 'Medidas antropométricas não encontradas'});

            res.status(200).json(medidaProcurada);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
    
    static async atualizaMedida(req, res) {
        const propriedades = req.body;
        const idMedida = req.params.id;
        const id_consultaMedida = req.params.idConsulta;
        let dadosAtualizados = null;

        try {

            const medidaProcurada = await medidaServices.buscandoRegistroPorId(idMedida, {id_consultaMedida:id_consultaMedida});

            if(!medidaProcurada)
                return res.status(404).json({msg: 'Medidas antropométricas não encontradas'});

            if(propriedades.altura && propriedades.peso_atual)
                dadosAtualizados = medidaServices.calculaImc(propriedades.peso_atual, propriedades.altura) 
            else if(propriedades.altura === undefined && propriedades.peso_atual)
                dadosAtualizados = medidaServices.calculaImc(propriedades.peso_atual, medidaProcurada.altura);
            
            propriedades.imc_atual = dadosAtualizados.imc.toFixed(2);
            propriedades.classificacao_imc = dadosAtualizados.caracteristica;

            await medidaServices.atualizaRegistro(propriedades, idMedida, {id_consultaMedida:id_consultaMedida});

            res.status(200).json({msg: 'Medidas antropométricas atualizadas com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async deletaMedida(req, res) {
        const idMedida = req.params.id;
        const id_consultaMedida = req.params.idConsulta;

        try {
            const medidaProcurada = await medidaServices.buscandoRegistroPorId(idMedida, {id_consultaMedida:id_consultaMedida});

            if(!medidaProcurada)
                return res.status(404).json({msg: 'Medidas antropométricas não encontradas'});

            await medidaServices.deletaRegistro(idMedida, {id_consultaMedida:id_consultaMedida});

            res.status(200).json({msg: 'Medidas antropométricas deletadas com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }

    static async buscaUltimaMedidaCadastrada(req, res) {
        const id_consultaMedida = req.params.idConsulta;

        try {
            const medidas = await medidaServices.buscaRegistros({id_consultaMedida: id_consultaMedida});

            if(medidas.length > 0){
                const ultimaMedidaCadastrada = medidas.pop();
                
                return res.status(200).json(ultimaMedidaCadastrada);
            }else{

                return res.status(200).json(medidas);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }
    }
}

module.exports = Medida_antropometricaController;