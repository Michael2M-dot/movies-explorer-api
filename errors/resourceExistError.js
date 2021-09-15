const { RESOURCE_EXIST_ERROR_CODE } = require('./errors');

class ResourceExistErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = RESOURCE_EXIST_ERROR_CODE;
  }
}

module.exports = ResourceExistErr;
