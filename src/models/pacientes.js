'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pacientes.belongsTo(models.Usuarios, {
        foreignKey: 'id_usuario'
      });

      Pacientes.hasMany(models.Consultas,{
        foreignKey: 'id_paciente'
      });

      Pacientes.hasMany(models.Plano_alimentar,{
        foreignKey: 'id_pacientePlanoAlimentar'
      });
    }
  }
  Pacientes.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    sexo: DataTypes.STRING,
    n_cns: DataTypes.STRING,
    ubs: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pacientes',
  });
  return Pacientes;
};