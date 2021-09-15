const { AUTH_ERROR_CODE } = require('./errors');

class AuthErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR_CODE;
  }
}

module.exports = AuthErr;
