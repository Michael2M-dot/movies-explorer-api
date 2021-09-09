const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auths');
const auth = require('../middlewers/authHandler');
const corsRequestValidate = require('../middlewers/cors');
const NotFoundErr = require('../errors/notFoundError');

router.use(corsRequestValidate);
router.use('/', authRouter);
router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use((req, res, next) => {
  next(new NotFoundErr('Запрашиваемый ресурс не найден'));
});

module.exports = router;
