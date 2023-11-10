const Services = require("./Services");
const baseDados = require('../models');

class Refeicao_alimentoServices extends Services{
    constructor(){
        super('refeicoes_alimentos');
    }

    async atualizaRefeicaoAlimento(propriedades, where = {}){
        await baseDados[this.modelo].update(propriedades, {
            where:{
                ...where
            }
        });
    }
}

module.exports = Refeicao_alimentoServices;