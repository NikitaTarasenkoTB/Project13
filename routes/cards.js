const cardsRouter = require('express').Router();
const { getCards, postCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', postCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardsRouter;
