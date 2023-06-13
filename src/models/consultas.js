'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Consultas.belongsTo(models.Pacientes,{
        foreignKey: 'id_paciente'
      });

      Consultas.hasMany(models.Exames_laboratoriais, {
        foreignKey: 'id_consultaExame'
      });

      Consultas.hasMany(models.Medidas_antropometricas, {
        foreignKey: 'id_consultaMedida'
      });

      Consultas.hasMany(models.Anamnese, {
        foreignKey: 'id_consultaAnamnese'
      });

      Consultas.hasMany(models.Plano_alimentar, {
        foreignKey: 'id_consultaPlano'
      }); 
    }
  }
  Consultas.init({
    nome: DataTypes.STRING,
    data_atendimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Consultas',
  });
  return Consultas;
};