const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

let users = [];

fs.readFile(path.join(__dirname, '../data/users.json'), (error, data) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return;
  }
  users = JSON.parse(data);
});

usersRouter.get('/users', (request, response) => {
  response.send(users);
});

usersRouter.get('/users/:id', (request, response) => {
  // eslint-disable-next-line no-underscore-dangle
  const currentUser = users.find((item) => item._id === request.params.id);
  if (!currentUser) {
    response.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  }
  response.send(currentUser);
});

module.exports = usersRouter;
