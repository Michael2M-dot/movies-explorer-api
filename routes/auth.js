const router = require('express').Router();

const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

// регистрация пользователя
router.post('/signup', createUser);

// авторизация пользователя
router.post('/signin', login);

// выход из приложения
router.post('/signout', logout);

module.exports = router;
