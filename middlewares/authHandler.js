const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthErr = require('../errors/authError');

// проверка авторизованного пользователя
function authHandler(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthErr('Ошибка. Токен не пришел. Необходимо авторизоваться!'));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    next(new AuthErr('Ошибка. Не верный токен. Необходимо авторизоваться!'));
  }

  req.user = payload;

  return next();
}

module.exports = authHandler;
