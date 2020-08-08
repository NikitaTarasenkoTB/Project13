const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const urlMask = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (validateItem) => urlMask.test(validateItem),
      message: (wrongItem) => `${wrongItem.value} не ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // default: undefined
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
