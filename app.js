const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const error = require('./routes/app');
const auth = require('./middlewares/auth');

const { createUser, login } = require('./controllers/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use((req, res, next) => {
  req.user = {
    _id: req.user._id,
  };
  next();
});

const { PORT = 3000 } = process.env;

app.use('/',users);
app.use('/', cards);
app.use('/', error);
app.listen(PORT, () => {});

