const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationErr = require('../errors/validationError');
const ResourceExistErr = require('../errors/resourceExistError');
const NotFoundErr = require('../errors/notFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  COMMON_SUCCESS_CODE,
  CREATE_RESOURCE_SUCCESS_CODE,
  RESOURCE_NOT_FOUND,
  OBJECT_ID_ERROR,
  VALIDATION_ERROR,
  ERROR_MESSAGE,
} = require('../errors/errors');

// получаем данные пользователя
module.exports.getUser = (req, res, next) => {
  if (!req.user._id) {
    throw new ValidationErr('Ошибка. Не передан id пользователя!');
  }

  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(COMMON_SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErr('Ошибка. Пользователь с указанным id не найден!'));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        return next(new ValidationErr('Ошибка. Передан неверный формат id пользователя!'));
      }

      return next(err);
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
    throw new ValidationErr('Ошибка. Поле email или password не может быть пустым!');
  }

  if (password.length < 8) {
    throw new ValidationErr('Ошибка. Поле password не может быть меньше 8 символов!');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ResourceExistErr('Ошибка.Пользователь с таким id уже существует!');
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
          name: user.name,
        });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(
          `Ошибка. Переданы некорректные данные для создания пользователя: ${ERROR_MESSAGE(err)}`,
        ));
      }

      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ResourceExistErr('Ошибка. Пользователь с таким email уже существует!'));
      }

      return next(err);
    });
};

// получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(COMMON_SUCCESS_CODE).send(users))
    .catch((err) => next(err));
};

// обновляем данные пользователя
module.exports.updateUserData = (req, res, next) => {
  const { name, email } = req.body;

  if (!req.user._id) {
    throw new ValidationErr('Ошибка. Не передан id пользователя!');
  }

  if (!name || !email) {
    throw new ValidationErr('Ошибка. Не преданы данные для обновления пользователя');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ResourceExistErr('Ошибка.Пользователь с таким "email" уже существует!');
      }
    })
    .then(() => User.findByIdAndUpdate(req.user._id, { name, email },
      { new: true, runValidation: true }))
    .then((user) => {
      res.status(COMMON_SUCCESS_CODE)
        .send(user);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(
          `Ошибка. Переданы некорректные данные для создания пользователя: ${ERROR_MESSAGE(err)}`,
        ));
      }

      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErr('Ошибка. Пользователь с указанным id не найден.'));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        return next(new ValidationErr('Ошибка. Передан неверный формат id пользователя.'));
      }

      if (err.code === 11000) {
        return next(new ResourceExistErr('Ошибка. Пользователь с таким email уже существует!'));
      }

      return next(err);
    });
};

// авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ValidationErr('Ошибка. Поле "email" и "password" не может быть пустым'));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None',
        // secure: true,
        maxAge: 3600000 * 24 * 7,
      })
        .status(COMMON_SUCCESS_CODE)
        .send({ message: 'Авторизация прошла успешно!' });
    })
    .catch((err) => next(err));
};

// выход из приложения
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })
    .status(COMMON_SUCCESS_CODE)
    .send({ message: 'Вы вышли из приложения!' });
};
