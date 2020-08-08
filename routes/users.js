const usersRouter = require('express').Router();

const { getUsers, getUser, postUser } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.post('/users', postUser);

module.exports = usersRouter;
