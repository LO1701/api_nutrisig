const Services = require("./Services");
const baseDados = require('../models');
class PacienteServices extends Services{
    constructor(){
        super('Pacientes');
    }

    async buscaPaciente(cpf){
        const pacienteProcurado = await baseDados[this.modelo].findOne({
            where:{
                cpf: cpf
            },
            attributes:['id', 'nome', 'id_usuario']
        });

        return pacienteProcurado;
    }
}

module.exports = PacienteServices;