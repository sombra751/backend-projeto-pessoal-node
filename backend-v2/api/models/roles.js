'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.Usuarios, {
        through: 'usuarios_roles', 
        as: 'roles_do_usuario',
        foreignKey: 'role_id'
      })
      roles.belongsToMany(models.permissoes, {
        through: 'roles_permissoes', 
        as: 'roles_das_permissoes',
        foreignKey: 'role_id'
      })
      roles.hasMany(models.teste, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  roles.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};