const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
} = require('../controllers/users');

// получаем данные пользователя
router.get('/users/me', getUser);

// изменяем данные пользователя
router.patch('/users/me');

module.exports = router;
