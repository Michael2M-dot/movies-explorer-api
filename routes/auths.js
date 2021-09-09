const router = require('express').Router();
const { createNewAccountLimiter } = require('../utils/limiter');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

// регистрация пользователя
router.post('/signup', createNewAccountLimiter, createUser);

// авторизация пользователя
router.post('/signin', login);

// выход из приложения
router.post('/signout', logout);

module.exports = router;
