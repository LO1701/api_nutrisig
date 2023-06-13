'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('anamneses', 'id_consultaAnamnese', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Consultas', key: 'id'}});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('anamneses', 'id_consultaAnamnese');
  }
};
