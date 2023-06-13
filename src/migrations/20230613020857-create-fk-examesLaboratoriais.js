'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('exames_laboratoriais', 'id_consultaExame', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Consultas', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('exames_laboratoriais', 'id_consultaExame');
  }
};
