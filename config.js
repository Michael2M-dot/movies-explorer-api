require('dotenv').config();

const {
  JWT_SECRET = 'secret-key',
  MONGO_URL = 'mongodb://localhost:27017/bestfilmsdb',
} = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
};
