const express = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const app = express();
app.use(cookie());

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: 'Необходимо авторизоваться!' });
  }
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходимо авторизоваться!' });
  }
  req.user = payload;
  next();
};