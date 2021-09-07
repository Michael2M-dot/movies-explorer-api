const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewers/errorsHandler');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bestfilmsdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', router);

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Web-Server listen on ${PORT}`);
});
