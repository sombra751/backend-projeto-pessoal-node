const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .get('/role', RoleController.pegaTodosRoles)
    .post('/role', RoleController.cadastrar )

module.exports = router