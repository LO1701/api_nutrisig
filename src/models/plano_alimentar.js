'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plano_alimentar extends Model {

    static associate(models) {
      Plano_alimentar.belongsTo(models.Consultas, {
        foreignKey: 'id_consultaPlano'
      });

      Plano_alimentar.belongsTo(models.Pacientes, {
        foreignKey: 'id_pacientePlanoAlimentar'
      });

      Plano_alimentar.hasMany(models.Refeicoes, {
        foreignKey: 'id_planoAlimentar'
      });

      Plano_alimentar.hasMany(models.refeicoes_alimentos, {
        foreignKey: 'id_plano'
      });
    }
  }
  Plano_alimentar.init({
    nome: DataTypes.STRING,
    teto_kcal: DataTypes.FLOAT,
    validade: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Plano_alimentar',
    freezeTableName: true
  });
  return Plano_alimentar;
};