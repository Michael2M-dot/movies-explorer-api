const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const ValidationErr = require('../errors/validationError');
const ResourceExistErr = require('../errors/resourceExistError');
const NotFoundErr = require('../errors/notFoundError');

const {
  COMMON_SUCCESS_CODE,
  CREATE_RESOURCE_SUCCESS_CODE,
  RESOURCE_NOT_FOUND,
  OBJECT_ID_ERROR,
  VALIDATION_ERROR,
  ERROR_MESSAGE,
  MONGO_DB_ERROR,
  respAuthorizationSuccess,
  respLogOutSuccess,
  errEmailOrPasswordEmpty,
  errUserEmailAlreadyExist,
  errUserIdEmpty,
  errWrongUserId,
  errUserWithIdNotExist,
  errWrongUserData,
  errPasswordMinLengthError,
  errNameOrEmailEmpty,
} = require('../errors/errors');

// получаем данные пользователя
module.exports.getUser = (req, res, next) => {
  if (!req.user._id) {
    throw new ValidationErr(errUserIdEmpty);
  }

  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(COMMON_SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErr(errUserWithIdNotExist));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        return next(new ValidationErr(errWrongUserId));
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
    throw new ValidationErr(errEmailOrPasswordEmpty);
  }

  if (password.length < 8) {
    throw new ValidationErr(errPasswordMinLengthError);
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ResourceExistErr(errUserEmailAlreadyExist);
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
          `${errWrongUserData}: ${ERROR_MESSAGE(err)}`,
        ));
      }

      if (err.name === MONGO_DB_ERROR && err.code === 11000) {
        return next(new ResourceExistErr(errUserEmailAlreadyExist));
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
    throw new ValidationErr(errUserIdEmpty);
  }

  if (!name || !email) {
    throw new ValidationErr(errNameOrEmailEmpty);
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ResourceExistErr(errUserEmailAlreadyExist);
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
          `${errWrongUserData}: ${ERROR_MESSAGE(err)}`,
        ));
      }

      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErr(errUserWithIdNotExist));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        return next(new ValidationErr(errWrongUserId));
      }

      if (err.code === 11000) {
        return next(new ResourceExistErr(errUserEmailAlreadyExist));
      }

      return next(err);
    });
};

// авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ValidationErr(errEmailOrPasswordEmpty));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 3600000 * 24 * 7,
      })
        .status(COMMON_SUCCESS_CODE)
        .send({ message: respAuthorizationSuccess });
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
    .send({ message: respLogOutSuccess });
};
