const User = require('../models/user');

function getUsers(request, response) {
  User.find({})
    .then((usersData) => response.send({ data: usersData }))
    .catch(() => response.status(500).send({ message: 'На сервере произошла ошибка' }));
}

function getUser(request, response) {
  User.findById(request.params.id)
    .then((userData) => {
      userData ? response.send({ data: userData }) : response.status(404).send({ message: 'Такого пользователя нет' });
    })
    .catch(() => response.status(404).send({ message: 'Такого пользователя нет' }));
}

function postUser(request, response) {
  const { name, about, avatar } = request.body;
  User.create({ name, about, avatar })
    .then((newUserData) => response.send({ data: newUserData }))
    .catch((error) => response.status(400).send({ message: error.message }));
}

function updateProfileName(request, response) {
  User.findByIdAndUpdate(
    request.user._id,
    { name: request.body.name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedData) => {
      updatedData ? response.send({ data: updatedData }) : response.status(404).send({ message: 'Такого пользователя нет' });
    })
    .catch(() => response.status(500).send({ message: 'На сервере произошла ошибка или не пройдена валидация' }));
}

function updateAvatar(request, response) {
  User.findByIdAndUpdate(
    request.user._id,
    { avatar: request.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedData) => {
      updatedData ? response.send({ data: updatedData }) : response.status(404).send({ message: 'Такого пользователя нет' });
    })
    .catch(() => response.status(500).send({ message: 'На сервере произошла ошибка или не пройдена валидация' }));
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateProfileName,
  updateAvatar,
};
