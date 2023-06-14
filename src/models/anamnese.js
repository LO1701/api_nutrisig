'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anamnese extends Model {

    static associate(models) {
      Anamnese.belongsTo(models.Consultas, {
        foreignKey: 'id_consultaAnamnese'
      });
    }
  }
  Anamnese.init({
    questao: DataTypes.STRING,
    resposta: DataTypes.STRING,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anamnese',
  });
  return Anamnese;
};