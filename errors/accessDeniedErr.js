const { ACCESS_DENIED_CODE } = require('./errors');

class AccessDeniedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_DENIED_CODE;
  }
}

module.exports = AccessDeniedErr;
