const bodyParser = require('body-parser')
const usuarios = require('./usuariosRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')
const permissao = require('./permissao')
const seguranca = require('./seguranca')
const cursos = require('./cursosRoute')
const materias = require('./materiasRouter')
const admins = require('./adminsRouter')
const respostas = require('./respostasRouter')
const atividades = require('./atividadesRouter')
const aulas = require('./aulasRoute')
const alternativas = require('./alternativasRouter')

module.exports = app => {
    app.use(
        bodyParser.json(),
        auth,
        usuarios,
        role,
        permissao,
        seguranca,
        cursos,
        materias,
        admins,
        respostas,
        atividades,
        aulas,
        alternativas
    )
}
