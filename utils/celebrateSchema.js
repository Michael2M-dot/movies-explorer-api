const { Joi, Segments } = require('celebrate');

// регулярные выражения
const {
  REGEX_URL,
  REGEX_JWT,
  REGEX_PASSWORD,
  REGEX_ID,
} = require('./REGEX');

// схема для регистрации нового пользователя
module.exports.signUpSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).regex(REGEX_PASSWORD),
    name: Joi.string().min(2).max(30),
  }),
};

// схема авторизации пользователя
module.exports.signInSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).regex(REGEX_PASSWORD),
  }),
};

// схема проверка токена
module.exports.userAuthSchema = {
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string().required().regex(REGEX_JWT),
  }),
};

// схема для данных обновления информации о пользователе
module.exports.updateUserDataValidSchema = {
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string().required().regex(REGEX_JWT),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // email: Joi.string().required().email(),
  }),
};

// схема для добавление фильма
module.exports.createMovieValidSchema = {
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string().required().regex(REGEX_JWT).required(),
  }),
  // [Segments.PARAMS]: Joi.object().keys({
  //   _id: Joi.string().required().min(24).max(24)
  //     .regex(REGEX_ID),
  // }),
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().regex(REGEX_URL),
    trailer: Joi.string().required().uri().regex(REGEX_URL),
    thumbnail: Joi.string().required().uri().regex(REGEX_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

// схема запросов с использованием ID карточки
module.exports.movieAccessSchema = {
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string().required().regex(REGEX_URL),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().required().min(24).max(24)
      .regex(REGEX_ID),
  }),
};
