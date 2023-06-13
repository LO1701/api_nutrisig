'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refeicoes_alimentos extends Model {

    static associate(models) {
      refeicoes_alimentos.belongsTo(models.Plano_alimentar, {
        foreignKey: 'id_plano'
      });

      refeicoes_alimentos.belongsTo(models.Alimentos, {
        foreignKey: 'id_alimentos'
      });

      refeicoes_alimentos.belongsTo(models.Refeicoes, {
        foreignKey: 'id_refeicoes'
      });
    }
  }
  refeicoes_alimentos.init({
    id_plano: DataTypes.INTEGER,
    id_alimentos: DataTypes.INTEGER,
    id_refeicoes: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    categoria: DataTypes.STRING,
    colesterol: DataTypes.STRING,
    umidade: DataTypes.DOUBLE,
    calorias_kcal: DataTypes.DOUBLE,
    calorias_kj: DataTypes.DOUBLE,
    proteinas: DataTypes.DOUBLE,
    lipidios: DataTypes.DOUBLE,
    carboidratos: DataTypes.DOUBLE,
    fibra_alimentar: DataTypes.DOUBLE,
    cinzas: DataTypes.DOUBLE,
    calcio: DataTypes.DOUBLE,
    magnesio: DataTypes.DOUBLE,
    gramas: DataTypes.DOUBLE,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refeicoes_alimentos',
  });
  return refeicoes_alimentos;
};