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
  VALIDATION_ERROR,
  ERROR_MESSAGE,
} = require('../errors/errors');

// получаем данные пользователя
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(COMMON_SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === RESOURCE_NOT_FOUND) {
        next(new NotFoundErr('Пользователь с указанным id не найден!'));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        next(new ValidationErr('Передан неверный формат id пользователя!'));
      }

      next(ServerErr);
    });
};

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new ValidationErr('Поле email или password не может быть пустым!');
  }

  if (password.length < 8) {
    throw new ValidationErr('Поле password не может быть меньше 8 символов!');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return new ResourceExistErr('Пользователь с таким id уже существует!');
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATE_RESOURCE_SUCCESS_CODE)
        .send({
          _id: user._id,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new ValidationErr(
          `Переданы некорректные данные для создания пользователя: ${ERROR_MESSAGE}`,
        ));
      }

      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ResourceExistErr('Такой пользователь уже существует!'));
      }

      next();
    });
};
