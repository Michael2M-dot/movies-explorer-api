const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auths');
const auth = require('../middlewares/authHandler');
const corsRequestValidate = require('../middlewares/cors');
const NotFoundErr = require('../errors/notFoundError');
const { validateUserAuthToken } = require('../middlewares/validations');
const { errResourceNotFound } = require('../errors/errors');

router.use(corsRequestValidate);
router.use('/api', authRouter);
router.use(validateUserAuthToken, auth);
router.use('/api', userRouter);
router.use('/api', movieRouter);
router.use((req, res, next) => {
  next(new NotFoundErr(errResourceNotFound));
});

module.exports = router;
