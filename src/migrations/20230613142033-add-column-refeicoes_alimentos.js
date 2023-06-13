'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('refeicoes_alimentos', 'gramas', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('refeicoes_alimentos', 'gramas');
  }
};
