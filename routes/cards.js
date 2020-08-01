const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

cardsRouter.get('/cards', (request, response) => {
  const reader = fs.createReadStream(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' });
  reader.pipe(response);
  reader.on('error', () => response.status(500).send({ message: 'Ошибка сервера' }));
});

module.exports = cardsRouter;
