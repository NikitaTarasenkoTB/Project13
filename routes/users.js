const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

let users = [];
let serverError = false;

fs.readFile(path.join(__dirname, '../data/users.json'), (error, data) => {
  if (error) {
    serverError = true;
    return;
  }
  users = JSON.parse(data);
});

usersRouter.get('/users', (request, response) => {
  // eslint-disable-next-line no-unused-expressions
  serverError ? response.status(500).send({ message: 'Ошибка сервера' }) : response.send(users);
});

usersRouter.get('/users/:id', (request, response) => {
  // eslint-disable-next-line no-underscore-dangle
  const currentUser = users.find((item) => item._id === request.params.id);
  if (!currentUser) {
    response.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  response.send(currentUser);
});

module.exports = usersRouter;
