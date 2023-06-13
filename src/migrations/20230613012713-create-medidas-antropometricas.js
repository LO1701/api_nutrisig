'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medidas_antropometricas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      altura: {
        type: Sequelize.FLOAT
      },
      peso_atual: {
        type: Sequelize.FLOAT
      },
      imc_atual: {
        type: Sequelize.FLOAT
      },
      estado_nutricional: {
        type: Sequelize.STRING
      },
      diagnostico_nutricional: {
        type: Sequelize.STRING
      },
      classificacao_imc: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medidas_antropometricas');
  }
};