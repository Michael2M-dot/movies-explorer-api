const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT=3000 } = process.env;

const app = express();

app.listen(PORT, () =>{
  console.log(`Web-Server listen on ${PORT}`)
});


