const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
  request.user = { _id: '5f2f07ea3ee4531e00181e65' };
  next();
});

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use((request, response) => response.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT);
