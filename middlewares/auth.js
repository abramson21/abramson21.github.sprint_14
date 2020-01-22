const jwt = require("jsonwebtoken");

function errorStatus(res) {
  return res
    .status(401)
    .send({ message: 'Доступ запрещен. Необходима авторизация' });
}

module.exports = (req, res, next) => {
  console.log(req.cookie.jwt);
  const cookie = req.cookie.jwt;
  const JWT_SECRET = 'dzFhMTFxMTlkcWhiMUBtYWlsLnJ1OnF3ZXF3ZXF3ZXF3ZXF3ZSI';
  if (!cookie) {
    errorStatus(res);
  }

  let payload;

  try {
    payload = jwt.verify(cookie, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    errorStatus(res);
  }
  next();
};