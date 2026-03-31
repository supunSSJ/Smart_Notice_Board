const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const Admin = require('../models/admin.model');

/**
 * Ensures the route can only be accessed by authenticated users with valid tokens.
 */
const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to req.admin (exclude password completely)
      req.admin = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed validation or expired');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

/**
 * Restricts access to specifically passed roles e.g limit to 'superadmin' only
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      res.status(403);
      throw new Error(`User role '${req.admin?.role || 'unknown'}' is explicitly not authorized to access this route`);
    }
    next();
  };
};

module.exports = { protect, authorize };
