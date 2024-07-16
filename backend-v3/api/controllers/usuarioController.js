const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const {username, password, email} = req.body
        try {    
            const usuario = await usuarioService.cadastrar({username, password, email})
            res.status(201).send(usuario)

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodosUsuarios(req,res) {
      
            const todosUsuarios = await usuarioService.pegaTudo()
            res.status(200).send(todosUsuarios)
               
    }
}

module.exports = UsuarioController