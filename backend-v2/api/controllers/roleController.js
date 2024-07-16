const RoleService = require("../services/roleService")

const roleService = new RoleService()

class RoleController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body
        try {
            const role = await roleService.cadastrar({ nome, descricao })
            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async listRoles(req, res) {
        try {
            const todasRoles = await roleService.listRoles()
            res.status(200).send(todasRoles)
        } catch (error) {
            res.status(400).send({ message: error.message })

        }
    }

    static async getRole(req, res) {
        const { id } = req.params;
        try {
          const umaRole = await RoleService.getRoleById(id);
          res.status(200).send(umaRole);
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      }
}

module.exports = RoleController