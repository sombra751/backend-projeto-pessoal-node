const {Router} = require('express')
const MateriaController = require('../controllers/MateriaController')

const router = Router()

router
    .get('/materias', MateriaController.pegaTodasAsMaterias)
    .get('/materias/:id', MateriaController.pegaUmaMateria)
    .post('/materias', MateriaController.criaUmaMateria)
    .put('/materias/:id', MateriaController.atualizaUmaMateria)
    .delete('/materias/:id', MateriaController.deletaMateria)
    
    // .put('/materias/:id', MateriaController.atualizaMateriaComAtividadesEAlternativas)
    // .delete('/materias/:id', MateriaController.deletaMateriasComAtividadesEAlternativas)
    // .get('/materias', MateriaController.pegaTodasMateriasComAtividadesEAlternativas)
    // .get('/materias/:id', MateriaController.pegaUmaMateriasComAtividadesEAlternativas)
    .post('/materias', MateriaController.criaMateriaAtividadesAlternativas)


module.exports = router