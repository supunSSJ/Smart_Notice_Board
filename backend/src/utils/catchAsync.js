/**
 * Wraps async route handlers to securely pass errors to the 
 * centralized error handler without needing ad-hoc try-catch blocks everywhere.
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
