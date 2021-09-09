const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const {
  userAuthSchema,
  createMovieValidSchema,
  movieAccessSchema,
} = require('../utils/celebrateSchema');

// добавляем фильм
router.post('/movies', celebrate(createMovieValidSchema), createMovie);

// удаляем фильм
router.delete('/movies/:_id', celebrate(movieAccessSchema), deleteMovie);

// получаем все фильмы
router.get('/movies', celebrate(userAuthSchema), getMovies);

module.exports = router;
