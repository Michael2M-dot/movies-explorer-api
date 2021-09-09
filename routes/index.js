const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundErr = require('../errors/notFoundError');

router.use('/', userRouter);
router.use('/', movieRouter);
router.use((req, res, next) => {
  next(new NotFoundErr('Запрашиваемый ресурс не найден'));
});

module.exports = router;
