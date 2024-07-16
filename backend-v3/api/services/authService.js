const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const usuario = await database.Usuarios.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email: dto.email
            }
        })

        if (!usuario) {
            throw new Error('Usuário não cadastrado')
        }

        const senhasIguais = await compare(dto.password, usuario.password)

        if (!senhasIguais) {
            throw new Error('Usuário ou senha invalido')
        }

        const accessToken = sign({ id: usuario.id, email: usuario.email }, jsonSecret.secret, { expiresIn: 86400 })

        return { accessToken }
        // return res.status(200).json({ mensagem: `Usuário logado` })
    }
}

module.exports = AuthService