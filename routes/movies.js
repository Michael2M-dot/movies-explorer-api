const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// добавляем фильм
router.post('/movies', createMovie);

// удаляем фильм
router.delete('/movies/:_id', deleteMovie);

// получаем все фильмы
router.get('/movies', getMovies);

module.exports = router;
