const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (validateItem) => validator.isURL(validateItem),
      message: (wrongItem) => `${wrongItem.value} не ссылка!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
