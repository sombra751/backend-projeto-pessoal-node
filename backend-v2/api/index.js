const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3600;

app.use(cors());

// Defina suas rotas
routes(app);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));

module.exports = app;
