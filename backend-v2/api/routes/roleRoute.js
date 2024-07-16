const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .get('/role', RoleController.listRoles)
    .get('/role/:id', RoleController.getRole)
    .post('/role', RoleController.cadastrar )

module.exports = router