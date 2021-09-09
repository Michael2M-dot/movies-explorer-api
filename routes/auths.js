const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createNewAccountLimiter } = require('../utils/limiter');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

const {
  signUpSchema,
  signInSchema,
} = require('../utils/celebrateSchema');

// регистрация пользователя
router.post('/signup', createNewAccountLimiter, celebrate(signUpSchema), createUser);

// авторизация пользователя
router.post('/signin', celebrate(signInSchema), login);

// выход из приложения
router.post('/signout', logout);

module.exports = router;
