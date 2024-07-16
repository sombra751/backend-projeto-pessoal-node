const RoleService = require("../services/roleService")

const roleService = new RoleService()

class RoleController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body
        try {
            const role = await roleService.cadastrar({ nome, descricao})
            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodosRoles(req, res) {
        const todasRoles = await roleService.pegaTudo()
        res.status(200).send(todasRoles)
    }
}

module.exports = RoleController