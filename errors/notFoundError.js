const { RESOURCE_NOT_FOUND_CODE } = require('./errors');

class NotFoundErrors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = RESOURCE_NOT_FOUND_CODE;
  }
}

module.exports = NotFoundErrors;
