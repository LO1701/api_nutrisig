'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medidas_antropometricas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medidas_antropometricas.belongsTo(models.Consultas, {
        foreignKey: 'id_consultaMedida'
      });
    }
  }
  Medidas_antropometricas.init({
    altura: DataTypes.FLOAT,
    peso_atual: DataTypes.FLOAT,
    imc_atual: DataTypes.FLOAT,
    estado_nutricional: DataTypes.STRING,
    diagnostico_nutricional: DataTypes.STRING,
    classificacao_imc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medidas_antropometricas',
  });
  return Medidas_antropometricas;
};