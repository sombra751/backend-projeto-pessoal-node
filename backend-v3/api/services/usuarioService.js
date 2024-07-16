const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async pegaTudo(){
        const pegaUsuarios = await database.Usuarios.findAll()
        return pegaUsuarios
    }

    async cadastrar(dto) {
        const usuario = await database.Usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuário ja cadastrado')
        }
        try {
            const passwordHash = await hash(dto.password, 8)
            const novoUsuario = await database.Usuarios.create({
                id: uuid.v4(),
                username: dto.username,
                password: passwordHash,
                email: dto.email
            })

            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }
}

module.exports = UsuarioService