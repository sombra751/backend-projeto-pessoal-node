const { getRole } = require('../controllers/roleController')
const database = require('../models')
const uuid = require('uuid')

class RoleService {

    async listRoles() {
        const pegaRoles = await database.roles.findAll()
        return pegaRoles
    }

    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (role) {
            throw new Error('Role já cadastrado')
        }

        try {
            const novoRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novoRole
        } catch (error) {
            throw new Error('Erro ao cadastrar role')
        }
    }

    static async getRoleById(id) {
        try {
          const role = await database.roles.findOne({
            where: {
              id: id
            }
          });
          return role;
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

module.exports = RoleService