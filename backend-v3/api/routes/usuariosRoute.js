const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require("../middleware/autenticado")


const router = Router();

// router.use(autenticado)

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.pegaTodosUsuarios)
    // .get('usuarios/:id')
    // .put('usuarios/:id')
    // .delete('usuarios/:id')

module.exports = router;