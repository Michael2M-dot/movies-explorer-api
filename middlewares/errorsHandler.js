const {
  errCommonServerError,
  DEFAULT_SERVER_ERROR_CODE,
} = require('../errors/errors');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_SERVER_ERROR_CODE, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === DEFAULT_SERVER_ERROR_CODE
        ? errCommonServerError
        : message,
    });

  next();
};

module.exports = errorsHandler;
