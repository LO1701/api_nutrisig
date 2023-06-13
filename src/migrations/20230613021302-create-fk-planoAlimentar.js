'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('plano_alimentars', 'id_consultaPlano', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Consultas', key: 'id'}
    });

    await queryInterface.addColumn('plano_alimentars', 'id_pacientePlanoAlimentar', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Pacientes', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('plano_alimentars', 'id_consultaPlano');
    await queryInterface.removeColumn('plano_alimentars', 'id_pacientePlanoAlimentar');
  }
};
