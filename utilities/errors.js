'use strict';

exports.serverError = function (error) {
    error = error || {};

    error.httpStatusCode = 500;
    error.message = 'server-error';

    return error;
};

exports.clientError = function (reason, error) {
    error = error || {};

    error.httpStatusCode = 400;
    error.reason = reason;

    return error;
};
