const PermissaoService = require("../services/permissaoService")

const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body
        try {
            const role = await permissaoService.cadastrar({ nome, descricao })
            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async pegaTodosPermissoes(req, res) {
        const todasPermissoes = await permissaoService.pegaTudo()
        res.status(200).send(todasPermissoes)
    }
}

module.exports = PermissaoController