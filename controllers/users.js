const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = (req, res) => {
  User.find({})
  .then((user) => {
    if (user.length === 0){
      return res.status(404).send({ message: 'База данных user пуста! '})
    }
    return res.send({ data: user })
  })
  .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then(({ name, about, avatar, email }) => res.send({name, about, avatar, email }))
    .catch(() => res.status(404).send({ message: 'Неверные данные!' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((userId) => {
    if (!userId) {
      res.status(404).send({ message: 'Такого пользователя нет' });
    } else {
      res.send({ userId });
    }
  })
  .catch(() => res.status(500).send({ message: "Нет пользователя с таким id"}));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('token', token);
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};