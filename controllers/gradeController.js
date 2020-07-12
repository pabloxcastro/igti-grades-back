const gradeModel = require('../models/grade.js');
//const { //logger } = require('../config///logger.js');

// OK
const create = async (req, res) => {
  try {
    const { name, subject, type, value } = req.body;

    const grade = await gradeModel.create({
      name: name,
      subject: subject,
      type: type,
      value: value,
    });

    res.send({ grade, name, subject, type, value });

    //logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

// OK
const findByName = async (req, res) => {
  const name = req.params.name;

  try {
    //condicao para o filtro no findAll
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};

    const grades = await gradeModel.find(condition);

    if (!grade) {
      return res.send({ message: 'Grade não encontrada' });
    }

    res.send(grade);

    ////logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    ////logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

// OK
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await gradeModel.findOne({ _id: id });

    if (!grade) {
      return res.send({ message: 'Grade não encontrada' });
    }

    res.send(grade);

    ////logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

// OK
const findAll = async (req, res) => {
  try {
    const name = req.body.name;

    //condicao para o filtro no findAll
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};

    const grades = await gradeModel.find(condition);

    res.send(grades);
    //logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

// Update
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  const gradeFound = await gradeModel.findOne({ _id: id });

  if (!gradeFound) {
    return res.send({ message: 'Grade não encontrada' });
  }

  const { name, subject, type, value } = req.body;

  const grade = await gradeModel.updateOne(
    { _id: id },
    { $set: { name: name, subject: subject, type: type, value: value } }
  );

  try {
    res.send({ message: 'Grade atualizado com sucesso', grade });

    //logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    //logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

// OK
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const grade = await gradeModel.deleteOne({ _id: id });

    if (grade.deletedCount === 0) {
      return res.send({ message: 'Grade não encontrada' });
    }

    res.send({ grade });

    //logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

// OK
const removeAll = async (req, res) => {
  try {
    const name = req.body.name;
    //condicao para o filtro no findAll
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};

    const grades = await gradeModel.deleteMany(condition);

    if (grades.deletedCount === 0) {
      return res.send({ message: 'Grade não encontrada' });
    }

    res.send({
      message: `Grades excluidos`,
    });
    //logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

module.exports.controller = {
  create,
  findAll,
  findOne,
  findByName,
  update,
  remove,
  removeAll,
};
