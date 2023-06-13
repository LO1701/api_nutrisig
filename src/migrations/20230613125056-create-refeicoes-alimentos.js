'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refeicoes_alimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_plano: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Plano_alimentar', key: 'id'}
      },
      id_alimentos: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Alimentos', key: 'id'}

      },
      id_refeicoes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Refeicoes', key: 'id'}
      },
      nome: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      colesterol: {
        type: Sequelize.STRING
      },
      umidade: {
        type: Sequelize.DOUBLE
      },
      calorias_kcal: {
        type: Sequelize.DOUBLE
      },
      calorias_kj: {
        type: Sequelize.DOUBLE
      },
      proteinas: {
        type: Sequelize.DOUBLE
      },
      lipidios: {
        type: Sequelize.DOUBLE
      },
      carboidratos: {
        type: Sequelize.DOUBLE
      },
      fibra_alimentar: {
        type: Sequelize.DOUBLE
      },
      cinzas: {
        type: Sequelize.DOUBLE
      },
      calcio: {
        type: Sequelize.DOUBLE
      },
      magnesio: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('refeicoes_alimentos');
  }
};