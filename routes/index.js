const router = require('express').Router();
const userRouter = require('./users');
const authUser = require('./auth');
const movieRouter = require('./movies');

router.use('/', userRouter);
router.use('/', authUser);
router.use('/', movieRouter);

module.exports = router;
