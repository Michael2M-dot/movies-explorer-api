const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovieData,
  validateMovieAccessId,
} = require('../middlewares/validations');

// добавляем фильм
router.post('/movies', validateCreateMovieData, createMovie);

// удаляем фильм
router.delete('/movies/:_id', validateMovieAccessId, deleteMovie);

// получаем все фильмы
router.get('/movies', getMovies);

module.exports = router;
