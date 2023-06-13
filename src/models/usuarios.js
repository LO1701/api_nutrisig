'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {

    static associate(models) {
      Usuarios.hasMany(models.Pacientes, {
        foreignKey: 'id_usuario'
      });

      Usuarios.hasMany(models.Alimentos, {
        foreignKey: 'id_usuario'
      });

      Usuarios.hasMany(models.Refeicoes, {
        foreignKey: 'id_usuario'
      });
    }
  }
  Usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};