'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('refeicoes', 'id_planoAlimentar', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Plano_alimentars', key: 'id'}
    });

    await queryInterface.addColumn('refeicoes', 'id_usuario', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Usuarios', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('refeicoes', 'id_planoAlimentar');
    await queryInterface.removeColumn('refeicoes', 'id_usuario');
  }
};
