const {Router} = require('express')
const alternativasController = require('../controllers/alternativasController')

const router = Router()

router
    .get('/alternativas', alternativasController.listAlternativas)
    .get('/alternativas/:id', alternativasController.getAlternativas)
    .post('/alternativas', alternativasController.postAlternativas)
    .put('/alternativas/:id', alternativasController.putAlternativas)
    .delete('/alternativas/:id', alternativasController.deleteAlternativas)

module.exports = router