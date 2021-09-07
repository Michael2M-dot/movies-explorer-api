const router = require('express').Router();
const userRouter = require('./users');
const authUser = require('./auth');

router.use('/', userRouter);
router.use('/', authUser);

module.exports = router;
