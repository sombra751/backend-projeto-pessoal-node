const bodyParser = require('body-parser')
const usuarios = require('./usuariosRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')
const permissao = require('./permissao')
const seguranca = require('./seguranca')

module.exports = app => {
    app.use(
        bodyParser.json(),
        auth,
        usuarios,
        role,
        permissao,
        seguranca
    )
}
