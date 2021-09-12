const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorsHandler');
const router = require('./routes/index');
const { apiRequestLimiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bestfilmsdb',
} = process.env;

const app = express();

// парсеры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключили базу данных
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '613dc940d576d4b7047f8a45',
  };
  next();
});

// лимитируем количество запросов с одного IP
app.use(apiRequestLimiter);

// защита подделки заголовков
app.use(helmet());

// пишем логи запросов
app.use(requestLogger);

// общий роут
app.use(router);

// пишем логи ошибок
app.use(errorLogger);

// ошибки валидации модуля celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Web-Server listen on ${PORT}`);
});
