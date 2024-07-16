'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      teste.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId', onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      teste.belongsTo(models.roles, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  teste.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teste',
  });
  return teste;
};