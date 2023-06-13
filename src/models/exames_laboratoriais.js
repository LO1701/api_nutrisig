'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exames_laboratoriais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exames_laboratoriais.belongsTo(models.Consultas, {
        foreignKey: 'id_consultaExame'
      });
    }
  }
  Exames_laboratoriais.init({
    nome: DataTypes.STRING,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exames_laboratoriais',
  });
  return Exames_laboratoriais;
};