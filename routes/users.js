const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  getUsers,
  updateUserData,
} = require('../controllers/users');
const {
  userAuthSchema,
  updateUserDataValidSchema,
} = require('../utils/celebrateSchema');

// получаем данные пользователя
router.get('/users/me', celebrate(userAuthSchema), getUser);

// изменяем данные пользователя
router.patch('/users/me', celebrate(updateUserDataValidSchema), updateUserData);

// получаем данные всех пользователей
router.get('/users', celebrate(userAuthSchema), getUsers);

module.exports = router;
