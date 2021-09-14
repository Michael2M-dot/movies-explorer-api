const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthErr = require('../errors/authError');
const {
  errWrongToken,
  errTokenEmpty,
} = require('../errors/errors');

// проверка авторизованного пользователя
function authHandler(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthErr(errTokenEmpty));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    next(new AuthErr(errWrongToken));
  }

  req.user = payload;

  return next();
}

module.exports = authHandler;
