const router = require('express').Router();
const { celebrate } = require('celebrate');

// получаем данные пользователя
router.get('/users/me')

// изменяем данные пользователя
router.patch('/users/me')

module.exports = router
