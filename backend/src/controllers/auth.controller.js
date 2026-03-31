const Admin = require('../models/admin.model');
const catchAsync = require('../utils/catchAsync');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Auth admin & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Validate request presence
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide an email and password');
  }

  // Check for admin user in the database, explicitly fetching the password field
  const admin = await Admin.findOne({ email }).select('+password');

  // Verify existence and password match cleanly
  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    // Explicitly secure error message: don't reveal if user exists or not
    throw new Error('Invalid email or password');
  }

  res.json({
    success: true,
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    },
  });
});

/**
 * @desc    Get current logged in admin safely
 * @route   GET /api/auth/me
 * @access  Private (Protected example)
 */
const getMe = catchAsync(async (req, res) => {
  // Safe extraction directly from the token decoded ID
  const admin = await Admin.findById(req.admin.id);
  res.status(200).json({
    success: true,
    data: admin,
  });
});

module.exports = { login, getMe };
