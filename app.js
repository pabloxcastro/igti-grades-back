const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//const { logger } = require('./config/logger.js');
const { controller } = require('./controllers/gradeController.js');
//const { rotas } = require("./routes/gradeRouter.js");

try {
  mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  //logger.info('Conectado ao banco de dados');
} catch (error) {
  //logger.error(`Erro ao conectar no banco de dados! ${error}`);
}

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.URL,
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

//app.use(rotas);
app.post('/grade', controller.create);
app.get('/grade/:id', controller.findOne);
app.get('/grade?name:', controller.findByName);
app.get('/grade', controller.findAll);
app.put('/grade/:id', controller.update);
app.delete('/grade/:id', controller.remove);
app.delete('/grade/', controller.removeAll);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Servidor em execucao na porta ${process.env.PORT}`);
});
