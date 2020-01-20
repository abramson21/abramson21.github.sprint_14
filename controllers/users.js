const bcrypt = require('bcryptjs');
const User = require('../models/user');
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
  const {name, about, avatar, email, password} = req.body;
  if (password.length > 9) {
    bcrypt.hash(password, 10)
    .then(hash => User.create({name, about, avatar, email, password: hash}))
      .then(user => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Не удалось создать пользователя' }));
  }
  else {
    res.status(500).send({ message: 'Слишком короткий пароль!' });
  }
}


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
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', {expiresIn: '7d'});
            console.log(token);
            res.cookie('token', token);
            res.status(200).send({ token });
        })
        .catch((err) => {

            res.status(401).send({ message: err.message });
        });
};