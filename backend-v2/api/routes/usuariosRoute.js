const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const usuarioRolesControllers = require('../controllers/usuarioRolesControllers');

const autenticado = require("../middleware/autenticado");
const { post } = require('..');


const router = Router();

// router.use(autenticado)

router
    // .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', usuarioRolesControllers.obterTodosUsuariosETestes)
    .get('/usuarios/:id', usuarioRolesControllers.obterUsuarioETestePorId )
    .put('/usuarios/:id', usuarioRolesControllers.atualizarUsuarioETeste)
    .delete('/usuarios/:id', usuarioRolesControllers.excluirUsuarioETestePorId)
    .post('/usuarios', usuarioRolesControllers.criarEstudantes)
    .get('/usuarios-estudante', UsuarioController.getUsuariosEstudantesIds)
    
    .post('/usuarios-docente', usuarioRolesControllers.criarDocente)
    .get('/usuarios-docente', UsuarioController.getUsuarioDocente)

module.exports = router;