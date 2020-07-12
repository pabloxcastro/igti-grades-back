const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { logger } = require('./config/logger.js');
const { controller } = require('./controllers/gradeController.js');
//const { rotas } = require("./routes/gradeRouter.js");

try {
  mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  logger.info('Conectado ao banco de dados');
} catch (error) {
  logger.error(`Erro ao conectar no banco de dados! ${error}`);
}

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

//app.use(rotas);
app.post('/grade', controller.create);
app.get('/grade/:id', controller.findOne);
app.get('/grades', controller.findAll);
app.put('/grade/:id', controller.update);
app.delete('/grade/:id', controller.remove);
app.delete('/grades/', controller.removeAll);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Servidor em execucao na porta ${process.env.PORT}`);
});
