const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationErr = require('../errors/validationError');
const ServerErr = require('../errors/serverErr');
const ResourceExistErr = require('../errors/resourceExistError');
const NotFoundErr = require('../errors/notFoundError');

const {
  COMMON_SUCCESS_CODE,
  CREATE_RESOURCE_SUCCESS_CODE,
  VALIDATION_ERROR_CODE,
  RESOURCE_NOT_FOUND_CODE,
  RESOURCE_NOT_FOUND,
  OBJECT_ID_ERROR,
  ERROR_MESSAGE
} = require('../errors/errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(COMMON_SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === RESOURCE_NOT_FOUND) {
        next(new NotFoundErr('Пользователь с указанным id не найден!'))
      }
      if (err.kind === OBJECT_ID_ERROR ) {
        next(new ValidationErr('Передан неверный формат id пользователя!'))
      }
      next(ServerErr);
    })
}

