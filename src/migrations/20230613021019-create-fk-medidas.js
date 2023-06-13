'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('medidas_antropometricas', 'id_consultaMedida', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Consultas', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('medidas_antropometricas', 'id_consultaMedida');
  }
};
