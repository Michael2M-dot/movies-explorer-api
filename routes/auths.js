const router = require('express').Router();
const auth = require('../middlewares/authHandler');
const { createNewAccountLimiter } = require('../utils/limiter');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const {
  validateSignUp,
  validateSignIn,
  validateUserAuthToken,
} = require('../middlewares/validations');

// регистрация пользователя
router.post('/signup', createNewAccountLimiter, validateSignUp, createUser);

// авторизация пользователя
router.post('/signin', validateSignIn, login);

// выход из приложения
router.post('/signout', validateUserAuthToken, auth, logout);

module.exports = router;
