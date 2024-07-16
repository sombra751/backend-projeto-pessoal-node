const {Router} = require('express')
const AtividadeController = require('../controllers/AtividadeController')

const router = Router()

router
.get('/atividades', AtividadeController.pegaAtividadeAleatoria )
.get('/atividades/respostas', AtividadeController.comparaAtividadesComRespostas)
// .get('/atividades', AtividadeController.listAtividades)
.get('/atividades/:id', AtividadeController.getAtividades)
.post('/atividades', AtividadeController.postAtividades)
.put('/atividades/:id', AtividadeController.putAtividades)
.delete('/atividades/:id', AtividadeController.deleteAtividades)

module.exports = router