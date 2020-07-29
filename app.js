const express = require('express');
const path = require('path');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use((request, response) => response.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT);
