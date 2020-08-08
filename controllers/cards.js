const Card = require('../models/card');

function getCards(request, response) {
  Card.find({})
    .then((cardsData) => response.send({ data: cardsData }))
    .catch(() => response.status(500).send({ message: 'На сервере произошла ошибка' }));
}

function postCard(request, response) {
  const { name, link } = request.body;
  Card.create({ name, link, owner: request.user._id })
    .then((cardData) => response.send({ data: cardData }))
    .catch((error) => response.status(400).send({ message: error.message }));
}

function deleteCard(request, response) {
  Card.findByIdAndRemove(request.params.cardId)
    .then((cardData) => response.send({ data: cardData }))
    .catch(() => response.status(404).send({ message: 'Карточка не найдена' }));
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
};
