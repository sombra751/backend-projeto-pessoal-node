const { Op } = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.belongsToMany(models.roles, {
        through: 'usuarios_roles',
        as: 'usuario_roles',
        foreignKey: 'usuario_id'
      })
      Usuarios.belongsToMany(models.permissoes, {
        through: 'usuarios_permissoes',
        as: 'usuario_permissoes',
        foreignKey: 'usuario_id'
      }),
      Usuarios.hasMany(models.teste, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Usuarios.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        as: 'matriculas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Usuarios.hasMany(models.Cursos, {
        foreignKey: 'docente_id'
      })
    }
  }
  Usuarios.init({
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dados do tipo e-mail inválido'
        }
      }
    },
    password: DataTypes.STRING,
    telefone: {
      type: DataTypes.STRING,
      // validate: {
      //   isUnique: async function (value) {
      //     // Certifique-se de que Alunos está definido corretamente
      //     if (Alunos) {
      //       const aluno = await Alunos.findOne({
      //         where: {
      //           telefone: value,
      //           id: {
      //             [Op.not]: this.id // Exclui o aluno atual da busca
      //           }
      //         }
      //       });
      //       if (aluno) throw new Error('Já existe um aluno com esse telefone');
      //     } else {
      //       throw new Error('Modelo Alunos não está definido corretamente');
      //     }
      //   }
      // }
    },
    cep: {
      type: DataTypes.STRING,
      validate: {
        isCEP: function (value) {
          const cepRegex = /^\d{5}-\d{3}$/;
          if (!cepRegex.test(value)) {
            throw new Error('CEP inválido');
          }
        }
      }
    },
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuarios',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });
  return Usuarios;
};