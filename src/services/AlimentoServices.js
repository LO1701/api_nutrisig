const Services = require("./Services");
const baseDados = require('../models');
const alimentosTaco = require('../../dados_alimentos.json');

class AlimentoServices extends Services{
    constructor(){
        super('Alimentos');
    }

    async criaAlimentos(id){

        const alimentosSalvos = [];
        
        for(let i = 0; i < alimentosTaco.length; i++){
            alimentosSalvos.push({
                nome: alimentosTaco[i].description,
                categoria: alimentosTaco[i].category,
                colesterol: alimentosTaco[i].cholesterol_mg,
                id_usuario: id,
                umidade: alimentosTaco[i].humidity_percents,
                calorias_kcal: alimentosTaco[i].energy_kcal,
                calorias_kj: alimentosTaco[i].energy_kj,
                proteinas: alimentosTaco[i].protein_g,
                lipidios: alimentosTaco[i].lipid_g,
                carboidratos: alimentosTaco[i].carbohydrate_g,
                fibra_alimentar: alimentosTaco[i].fiber_g,
                cinzas: alimentosTaco[i].ashes_g,
                calcio: alimentosTaco[i].calcium_mg,
                magnesio: alimentosTaco[i].magnesium_mg,
            });
        }

        for(let i = 0; i < alimentosTaco.length; i++){

            await baseDados[this.modelo].create(alimentosSalvos[i]);
        }
    }
}

module.exports = AlimentoServices;