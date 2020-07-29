const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const reader = fs.createReadStream(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' });

cardsRouter.get('/cards', (request, response) => {
  reader.on('data', (data) => response.write(data));
  reader.on('end', () => response.end());
  reader.on('error', (error) => response.status(500).send({ message: 'Server error' }));
  //reader.pipe(response);
});

module.exports = cardsRouter;
