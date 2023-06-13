const baseDados = require('../models');

class Services{
    constructor(modelo){
        this.modelo = modelo
    }

    async criaRegistro(propriedades, where = {}){
        await baseDados[this.modelo].create(propriedades, { 
            where: {
                ...where
            }
        });
    }

    async procuraRegistroEmail(email){
        const modeloProcurado = await baseDados[this.modelo].findOne({
            where:{
                email: email
            }
        });

        return modeloProcurado;
    }

    async buscandoRegistroPorId(id, where = {}){
        const modeloProcurado = await baseDados[this.modelo].findOne({
            where:{
                id: id,
                ...where
            }
        });

        return modeloProcurado;
    }

    async buscaRegistros(where = {}){
        const modeloProcurado = await baseDados[this.modelo].findAll({
            where:{
                ...where
            }
        });

        return modeloProcurado;
    }

    async atualizaRegistro(propriedades, id, where = {}){
        await baseDados[this.modelo].update(propriedades, {
            where:{
                id: id,
                ...where
            }
        });
    }

    async deletaRegistro(id, where = {}){
        await baseDados[this.modelo].destroy({
            where:{
                id: id,
                ...where
            }
        });
    }
}

module.exports = Services;