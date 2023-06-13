'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pacientes', 'id_usuario', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Usuarios', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pacientes', 'id_usuario');
  }
};
