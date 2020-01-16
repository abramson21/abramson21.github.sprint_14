const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const validate = /^(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(.+[#a-zA-Z/:0-9]{1,})?\.(.+[#a-zA-Z/:0-9]{1,})?$/i;

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    match: validate,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (valid) => isEmail(valid),
      message: 'Неверный формат почты',
    },
  },
  password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
  }
});

module.exports = mongoose.model('user', userSchema);