const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { MONGO_URL } = require('./config');
const errorHandler = require('./middlewares/errorsHandler');
const router = require('./routes/index');
const { apiRequestLimiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// подключили базу данных
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(apiRequestLimiter);
app.use(cookieParser());
// защита подделки заголовков
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(errorLogger);
// ошибки валидации модуля celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Web-Server listen on ${PORT}`);
});
