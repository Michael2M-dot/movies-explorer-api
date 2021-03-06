const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: 'Поле "image" должно быть валидным url-адресом.',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator(trailer) {
        return validator.isURL(trailer);
      },
      message: 'Поле "trailer" должно быть валидным url-адресом.',
    },
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'В поле "owner" должен быть передан id владельца карточки'],
  },
  movieId: {
    type: Number,
    required: [true, 'В поле "movieId" должен быть передан id фильма от сервиса MoviesExplorer'],
  },
  // country: {
  //   type: String,
  //   required: [true, 'Поле "country" должно быть заполнено'],
  // },
  // director: {
  //   type: String,
  //   required: [true, 'Поле "director" должно быть заполнено'],
  // },
  // year: {
  //   type: String,
  //   required: [true, 'Поле "year" должно быть заполнено'],
  // },
  // description: {
  //   type: String,
  //   required: [true, 'Поле "description" должно быть заполнено'],
  // },
  // thumbnail: {
  //   type: String,
  //   required: [true, 'Поле "thumbnail" должно быть заполнено'],
  //   validate: {
  //     validator(thumbnail) {
  //       return validator.isURL(thumbnail);
  //     },
  //     message: 'Поле "thumbnail" должно быть валидным url-адресом.',
  //   },
  // },
  // nameEN: {
  //   type: String,
  //   required: [true, 'Поле "nameEN" должно быть заполнено'],
  // },
});

module.exports = mongoose.model('movie', movieSchema);
