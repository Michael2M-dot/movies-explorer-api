const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/authError')

const { NODE_ENV, JWT_SECRET } = process.env;

function authHandler (req, res, next) {
  const token = req.cookies.jwt;

  console.log(req.cookies.jwt);
  if (!token) {
    return next (new AuthErr('Токен не пришел. Необходимо авторизоваться!'));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
    );
  } catch(err) {
    next(new AuthErr('Токен не проошел верификацию. Необходимо авторизоваться!'))
  };

  req.user = payload;

  return next();
}

module.exports = authHandler;
