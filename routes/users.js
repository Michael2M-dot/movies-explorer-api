const router = require('express').Router();
const {
  getUser,
  getUsers,
  updateUserData,
} = require('../controllers/users');
const {
  validateUserUpdateData,
} = require('../middlewares/validations');

// получаем данные пользователя
router.get('/users/me', getUser);

// изменяем данные пользователя
router.patch('/users/me', validateUserUpdateData, updateUserData);

// получаем данные всех пользователей
router.get('/users', getUsers);

module.exports = router;
