const { celebrate, Joi } = require('celebrate');
const {
  REGEX_PASSWORD,
  REGEX_JWT,
  REGEX_ID,
} = require('../utils/REGEX');

// валидация регистрационных данных пользователя
module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Ошибка. Поле "email" должно быть валидным email-адресом!')
      .messages({
        'string.required': 'Ошибка. Поле "email" должно быть заполнено!',
      }),
    password: Joi.string().required().min(8)
      .message('Ошибка. Поле "password" должно содержать не менее 8 символов')
      .regex(REGEX_PASSWORD)
      .message(`Ошибка. Поле "password" должно содержать заглавные и прописные латинские буквы,
      цифры и символы "!@#$%^&*"`)
      .messages({
        required: 'Ошибка. Поле "password" должно быть заполнено!',
      }),
    name: Joi.string().required()
      .min(2)
      .message('Ошибка. Поле "name" должно содержать не менее 2 символов')
      .max(30)
      .message('Ошибка. Поле "name" должно содержать не более 30 символов')
      .messages({
        'string.required': 'Ошибка. Поле "name" должно быть заполнено!',
      }),
  }),
});

// валидация данных пользователя при входе в приложение
module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Ошибка. Поле "email" должно быть валидным email-адресом!')
      .messages({
        'string.required': 'Ошибка. Поле "email" должно быть заполнено!',
      }),
    password: Joi.string().required().min(8)
      .message('Ошибка. Поле "password" должно содержать не менее 8 символов')
      .regex(REGEX_PASSWORD)
      .message(`Ошибка. Поле "password" должно содержать заглавные и прописные латинские буквы,
        цифры и символы "!@#$%^&*"`)
      .messages({
        'string.required': 'Ошибка. Поле "password" должно быть заполнено!',
      }),
  }),
});

// проверка наличия токена
module.exports.validateUserAuthToken = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required()
      .regex(REGEX_JWT)
      .message('Ошибка. Передан невалидный токен')
      .messages({
        'string.required': 'Ошибка. Токен на пришел.',
      }),
  }),
});

// валидация данных обновления информации о пользователе
module.exports.validateUserUpdateData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .min(2)
      .message('Ошибка. Поле "name" должно содержать не менее 2 символов')
      .max(30)
      .message('Ошибка. Поле "name" должно содержать не более 30 символов')
      .messages({
        'string.required': 'Ошибка. Поле "name" должно быть заполнено!',
      }),
    email: Joi.string().required().email()
      .message('Ошибка. Поле "email" должно быть валидным email-адресом!')
      .messages({
        'string.required': 'Ошибка. Поле "email" должно быть заполнено!',
      }),
  }),
});

// валидация данных при добавление фильма
module.exports.validateCreateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .uri()
      .message('Ошибка. Поле "image" должно быть валидным url-адресом!'),
    trailer: Joi.string().required()
      .uri()
      .message('Ошибка. Поле "trailer" должно быть валидным url-адресом!'),
    thumbnail: Joi.string().required()
      .uri()
      .message('Ошибка. Поле "thumbnail" должно быть валидным url-адресом!'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация ID фильма
module.exports.validateMovieAccessId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required()
      .min(24)
      .message('Ошибка. Не верный id фильма!')
      .max(24)
      .message('Ошибка. Не верный id фильма!')
      .regex(REGEX_ID)
      .message('Ошибка. Не верный id фильма!')
      .messages({
        'string.required': 'Ошибка. Не передан id фильма!',
      }),
  }),
});
