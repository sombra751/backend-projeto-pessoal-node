const express = require('express')
const routes = require('./routes')
const cors = require('cors');



const app = express()
const port = 3600

routes(app)

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:57124');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  


app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

module.exports = app