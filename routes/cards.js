const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

cardsRouter.get('/cards', (request, response) => {
  try {
    const reader = fs.createReadStream(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' });

    reader.on('data', (data) => response.write(data));
    reader.on('end', () => response.end());
    reader.on('error', () => response.status(500).send({ message: 'Ошибка сервера' }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send({ message: 'Ошибка сервера' });
  }
});

module.exports = cardsRouter;
