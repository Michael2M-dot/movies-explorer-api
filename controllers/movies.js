const Movie = require('../models/movie');
const ValidationErr = require('../errors/validationError');
const ResourceExistErr = require('../errors/resourceExistError');
const AccessDeniedErr = require('../errors/accessDeniedErr');
const NotFoundErrors = require('../errors/notFoundError');

const {
  COMMON_SUCCESS_CODE,
  CREATE_RESOURCE_SUCCESS_CODE,
  VALIDATION_ERROR,
  ERROR_MESSAGE,
  RESOURCE_NOT_FOUND,
} = require('../errors/errors');

// добавляем фильм в базу
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATE_RESOURCE_SUCCESS_CODE)
      .send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(
          `Ошибка при валидации данные для создании фильма: ${ERROR_MESSAGE(err)}`,
        ));
      }

      return next(err);
    });
};

// получаем все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(COMMON_SUCCESS_CODE).send(movies))
    .catch((err) => next(err));
};

// удаляем фильм из базы
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new AccessDeniedErr('Отказано в доступе. Вы можете удалять только свои фильмы!');
      }
    })
    .then((movie) => Movie.deleteOne(movie, { new: true }))
    .then((result) => res.status(COMMON_SUCCESS_CODE).send({
      result, message: 'Фильм успешно удален из Вашей медиатеки!',
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr('Ошибка. Передан неверный формат id фильма!'));
      }

      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErrors('Ошибка. Фильм с указанным id не найден!'));
      }

      return next(err);
    });
};
