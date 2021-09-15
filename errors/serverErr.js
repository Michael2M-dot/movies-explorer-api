const { DEFAULT_SERVER_ERROR_CODE } = require('./errors');

class ServerErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT_SERVER_ERROR_CODE;
  }
}

module.exports = ServerErr;
