const database = require('../models')
const uuid = require('uuid')

class RoleService {

    async pegaTudo(){
        const pegaRoles = await database.roles.findAll()
        return pegaRoles
    }

    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if(role) {
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
}

module.exports = RoleService