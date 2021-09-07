const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name", должна составлять 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" должна составлять не более 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Email пользователя должен быть уникальным.'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Поле "email" должно быть валидным email-адресом.',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [8, 'Поле "password" должно содержать не менее 8 символов'],
    select: false, // запрещаем возвращать пароль при передаче данных пользователя
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
