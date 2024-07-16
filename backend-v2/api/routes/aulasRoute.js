const {Router } = require('express')
const aulasController = require('../controllers/aulasController')

const router = Router()

router
.get('/aulas', aulasController.listAulaAtividadeAtividade)
.get('/aulas/:id', aulasController.getAulaAtividadeAtividade)
.post('/aulas', aulasController.postAulaAtividadeAtividade)
.put('/aulas/:id', aulasController.putAulaAtividadeAtividade)
.delete('/aulas/:id', aulasController.deleteAulaAtividadeAlternativa)


module.exports = router