const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  getUsers,
  updateUserData,
} = require('../controllers/users');

// получаем данные пользователя
router.get('/users/me', getUser);

// изменяем данные пользователя
router.patch('/users/me', updateUserData);

// получаем данные всех пользователей
router.get('/users', getUsers);

module.exports = router;
