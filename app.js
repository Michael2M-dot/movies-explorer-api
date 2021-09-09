const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewers/errorsHandler');
const router = require('./routes/index');
const authHandler = require('./middlewers/authHandler');
const authRouter = require('./routes/auths');
const { apiLimiter } = require('./utils/limiter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bestfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '613752ce7569c3510038cbc5',
  };
  next();
});

// лимитируем количество запросов с одного IP
app.use(apiLimiter)

// авторизация пользователя
app.use('/', authRouter);

// роуты защищенные авторизацией
app.use('/', authHandler, router);

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Web-Server listen on ${PORT}`);
});
