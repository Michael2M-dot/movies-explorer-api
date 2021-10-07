const Movie = require('../models/movie');
const ValidationErr = require('../errors/validationError');
const AccessDeniedErr = require('../errors/accessDeniedErr');
const NotFoundErrors = require('../errors/notFoundError');

const {
  COMMON_SUCCESS_CODE,
  CREATE_RESOURCE_SUCCESS_CODE,
  VALIDATION_ERROR,
  ERROR_MESSAGE,
  OBJECT_ID_ERROR,
  RESOURCE_NOT_FOUND,
  respMovieDeleted,
  errWrongMovieData,
  errMovieIdEmpty,
  errWrongMovieId,
  errMovieWithIdNotExist,
  errUserAccessDenied,
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
    // country,
    // director,
    duration,
    // year,
    // description,
    image,
    trailer,
    nameRU,
    // nameEN,
    // thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATE_RESOURCE_SUCCESS_CODE)
      .send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(
          `${errWrongMovieData}: ${ERROR_MESSAGE(err)}`,
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
  // if (!req.params._id) {
  //   throw new ValidationErr(errMovieIdEmpty);
  // }

  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new AccessDeniedErr(errUserAccessDenied);
      }
    })
    .then((movie) => Movie.deleteOne(movie, { new: true }))
    .then((result) => res.status(COMMON_SUCCESS_CODE).send({
      result, message: respMovieDeleted,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(errWrongMovieId ));
      }

      if (err.name === RESOURCE_NOT_FOUND) {
        return next(new NotFoundErrors(errMovieWithIdNotExist));
      }

      if (err.kind === OBJECT_ID_ERROR) {
        return next(new ValidationErr(errMovieIdEmpty));
      }

      return next(err);
    });
};
