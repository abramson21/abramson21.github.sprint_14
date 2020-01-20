const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const error = require('./routes/app');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const { PORT = 3000 } = process.env;

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/', auth, users);
app.use('/', auth, cards);
app.use('/', auth, error);

app.listen(PORT, () => {});

