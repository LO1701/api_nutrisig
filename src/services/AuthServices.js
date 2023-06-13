const Services = require("./Services");
const baseDados = require('../models');

class AuthServices extends Services{
    constructor(){
        super('Usuarios');
    }

    async buscaUsuario(id, where = {}){
        const modeloProcurado = await baseDados[this.modelo].findOne({
            where:{
                id: id,
                ...where
            },
            attributes:['id', 'nome', 'email', 'role']
        });

        return modeloProcurado;
    }
}

module.exports = AuthServices;