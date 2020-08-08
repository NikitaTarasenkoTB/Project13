const User = require('../models/user');

function getUsers(request, response) {
  User.find({})
    .then((usersData) => response.send({ data: usersData }))
    .catch(() => response.status(500).send({ message: 'На сервере произошла ошибка' }));
}

function getUser(request, response) {
  User.findById(request.params.id)
    .then((userData) => response.send({ data: userData }))
    .catch(() => response.status(404).send({ message: 'Такого пользователя нет' }));
}

function postUser(request, response) {
  const { name, about, avatar } = request.body;
  User.create({ name, about, avatar })
    .then((newUserData) => response.send({ data: newUserData }))
    .catch((error) => response.status(400).send({ message: error.message }));
}

module.exports = {
  getUsers,
  getUser,
  postUser,
};
