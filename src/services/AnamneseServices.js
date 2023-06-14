const Services = require("./Services");
const baseDados = require('../models');

class AnamneseServices extends Services{
    constructor(){
        super('Anamnese');
    }

    async criaAnamneses(anamneseNova, id_consultaAnamnese){

        anamneseNova.forEach( async (element) => {
            element.id_consultaAnamnese = id_consultaAnamnese

            await baseDados[this.modelo].create(element);
        });
    }
}

module.exports = AnamneseServices;