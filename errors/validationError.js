const { VALIDATION_ERROR_CODE } = require('./errors');

class ValidationErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = ValidationErr;
