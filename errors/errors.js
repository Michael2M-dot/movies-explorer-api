module.exports.COMMON_SUCCESS_CODE = 200;
module.exports.CREATE_RESOURCE_SUCCESS_CODE = 201;
module.exports.VALIDATION_ERROR_CODE = 400;
module.exports.RESOURCE_NOT_FOUND_CODE = 404;
module.exports.DEFAULT_ERROR_CODE = 500;

module.exports.RESOURCE_NOT_FOUND = 'DocumentNotFoundError';
module.exports.VALIDATION_ERROR = 'ValidationError';
module.exports.OBJECT_ID_ERROR = 'ObjectId';
module.exports.MONGO_DB_ERROR = 'MongoError';

// тексты успешных действий
module.exports.respMovieDeleted = 'Фильм успешно удален из Вашей медиатеки!';
module.exports.respAuthorizationSuccess = 'Авторизация пользователя прошла успешно!';
module.exports.respLogOutSuccess = 'Вы вышли из приложения!';

// тексты ошибок для user
module.exports.errWrongEmailOrPassword = 'Ошибка. Неверный email или пароль!';
module.exports.errEmailOrPasswordEmpty = 'Ошибка. Поле "email" и "password" не может быть пустым';
module.exports.errNameOrEmailEmpty = 'Ошибка. Поле "email" и "name" не может быть пустым';
module.exports.errUserEmailAlreadyExist = 'Ошибка. Пользователь с таким "email" уже существует!';
module.exports.errUserIdEmpty = 'Ошибка. Не передан id пользователя!';
module.exports.errWrongUserId = 'Ошибка. Передан неверный формат id пользователя!';
module.exports.errUserWithIdNotExist = 'Ошибка. Пользователь с указанным id не найден.';
module.exports.errWrongUserData = 'Ошибка. Переданы некорректные данные для создания пользователя';
module.exports.errPasswordMinLengthError = 'Ошибка. Поле password не может быть меньше 8 символов!';

// тексты ошибок проверки токена
module.exports.errWrongToken = 'Ошибка. Не верный токен. Необходимо авторизоваться!';
module.exports.errTokenEmpty = 'Ошибка. Токен не пришел. Необходимо авторизоваться!';

module.exports.ERROR_MESSAGE = (err) => Object.values(err.errors).map((error) => error.message).join(', ');
