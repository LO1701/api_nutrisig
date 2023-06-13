'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alimentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alimentos.belongsTo(models.Usuarios, {
        foreignKey: 'id_usuario'
      });

      Alimentos.belongsToMany(models.Refeicoes, {
        through: 'refeicoes_alimentos',
        foreignKey: 'id_alimentos'
      });
    }
  }
  Alimentos.init({
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
    magnesio: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Alimentos',
  });
  return Alimentos;
};