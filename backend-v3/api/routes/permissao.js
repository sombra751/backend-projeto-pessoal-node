const { Router } = require('express')

const PermissaoController = require("../controllers/permissaoController")
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')

const router = Router()

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao', PermissaoController.pegaTodosPermissoes)

module.exports = router