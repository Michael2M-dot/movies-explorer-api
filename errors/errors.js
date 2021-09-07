module.exports.COMMON_SUCCESS_CODE = 200;
module.exports.CREATE_RESOURCE_SUCCESS_CODE = 201;
module.exports.VALIDATION_ERROR_CODE = 400;
module.exports.RESOURCE_NOT_FOUND_CODE = 404;
module.exports.DEFAULT_ERROR_CODE = 500;

module.exports.RESOURCE_NOT_FOUND = 'DocumentNotFoundError';
module.exports.VALIDATION_ERROR = 'ValidationError';
module.exports.OBJECT_ID_ERROR = 'ObjectId';

module.exports.ERROR_MESSAGE = (err) => Object.values(err.errors).map((error) => error.message).join(', ');
