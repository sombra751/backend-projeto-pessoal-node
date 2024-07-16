'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      usuarioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Usuarios', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      roleId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'roles', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('testes');
  }
};