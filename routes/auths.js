const router = require('express').Router();
const { createNewAccountLimiter } = require('../utils/limiter');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const {
  validateSignUp,
  validateSignIn,
} = require('../middlewares/validations');

// регистрация пользователя
// router.post('/signup', createNewAccountLimiter, celebrate(signUpSchema), createUser);
router.post('/signup', createNewAccountLimiter, validateSignUp, createUser);

// авторизация пользователя
router.post('/signin', validateSignIn, login);

// выход из приложения
router.post('/signout', logout);

module.exports = router;
