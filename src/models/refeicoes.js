'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refeicoes extends Model {

    static associate(models) {
      Refeicoes.belongsTo(models.Plano_alimentar, {
        foreignKey: 'id_planoAlimentar'
      });

      Refeicoes.belongsTo(models.Usuarios, {
        foreignKey: 'id_usuario'
      });

      Refeicoes.belongsToMany(models.Alimentos, {
        through: 'refeicoes_alimentos',
        foreignKey: 'id_refeicoes'
      });
    }
  }
  Refeicoes.init({
    turno: DataTypes.STRING,
    horario: DataTypes.TIME,
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Refeicoes',
  });
  return Refeicoes;
};