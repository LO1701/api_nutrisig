'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('consultas', 'id_paciente', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Pacientes', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('consultas', 'id_paciente');
  }
};
