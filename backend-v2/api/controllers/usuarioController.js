const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const {nome, password, email} = req.body
        try {    
            const usuario = await usuarioService.cadastrarUsuarioComPerfilEroles({nome, password, email})
            res.status(201).send(usuario)

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodosUsuarios(req,res) {
      
            const todosUsuarios = await usuarioService.pegaTudo()
            res.status(200).send(todosUsuarios)
               
    }

    static async getUsuarioDocente(req, res) {
        const getdocente = await usuarioService.getUsuariosDocenteIds()
        res. status(200).send(getdocente)
    }
    static async getUsuariosEstudantesIds(req, res) {
        const getdocente = await usuarioService.getUsuariosEstudantesIds()
        res. status(200).send(getdocente)
    }
}

module.exports = UsuarioController