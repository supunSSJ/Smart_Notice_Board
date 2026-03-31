const Notice = require('../models/notice.model');
const catchAsync = require('../utils/catchAsync');

/**
 * @desc    Create new notice
 * @route   POST /api/notices
 * @access  Private/Admin
 */
const createNotice = catchAsync(async (req, res) => {
  // Attach the authenticated admin's ID to the payload
  req.body.createdBy = req.admin.id;

  const notice = await Notice.create(req.body);

  res.status(201).json({
    success: true,
    data: notice
  });
});

/**
 * @desc    Get all notices for admin table (supports optional filters)
 * @route   GET /api/notices
 * @access  Private/Admin
 */
const getAdminNotices = catchAsync(async (req, res) => {
  const { category, pinned, status } = req.query;

  // Build query dynamically
  const query = {};
  if (category) query.category = category;
  if (pinned) query.pinned = pinned === 'true';
  if (status) query.status = status;

  const notices = await Notice.find(query)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notices.length,
    data: notices
  });
});

/**
 * @desc    Get public active notices
 * @route   GET /api/notices/public
 * @access  Public
 */
const getPublicNotices = catchAsync(async (req, res) => {
  const { category } = req.query;
  const now = new Date();

  // Base query: published status, started logically, hasn't ended logically
  const query = {
    status: 'published',
    $and: [
      { startDate: { $lte: now } },
      { $or: [{ endDate: { $gt: now } }, { endDate: null }, { endDate: { $exists: false } }] }
    ]
  };

  if (category) {
    query.category = category;
  }

  // Sort logically: pinned items stick to top, then high priority, then latest created
  const notices = await Notice.find(query)
    .sort({ pinned: -1, priority: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notices.length,
    data: notices
  });
});

/**
 * @desc    Get single notice by ID
 * @route   GET /api/notices/:id
 * @access  Public
 */
const getNoticeById = catchAsync(async (req, res) => {
  const notice = await Notice.findById(req.params.id)
    .populate('createdBy', 'name');

  if (!notice) {
    res.status(404);
    throw new Error('Notice not found');
  }

  res.status(200).json({
    success: true,
    data: notice
  });
});

/**
 * @desc    Update notice
 * @route   PUT /api/notices/:id
 * @access  Private/Admin
 */
const updateNotice = catchAsync(async (req, res) => {
  let notice = await Notice.findById(req.params.id);

  if (!notice) {
    res.status(404);
    throw new Error('Notice not found');
  }
  
  notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: notice
  });
});

/**
 * @desc    Delete notice
 * @route   DELETE /api/notices/:id
 * @access  Private/Admin
 */
const deleteNotice = catchAsync(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    res.status(404);
    throw new Error('Notice not found');
  }

  await notice.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  createNotice,
  getAdminNotices,
  getPublicNotices,
  getNoticeById,
  updateNotice,
  deleteNotice
};
