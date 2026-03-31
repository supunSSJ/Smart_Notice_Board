const Advertisement = require('../models/advertisement.model');
const catchAsync = require('../utils/catchAsync');

/**
 * @desc    Create new advertisement
 * @route   POST /api/admin/advertisements
 * @access  Private/Admin
 */
const createAd = catchAsync(async (req, res) => {
  const ad = await Advertisement.create(req.body);
  res.status(201).json({ success: true, data: ad });
});

/**
 * @desc    Get all advertisements for admin table
 * @route   GET /api/admin/advertisements
 * @access  Private/Admin
 */
const getAdminAds = catchAsync(async (req, res) => {
  const ads = await Advertisement.find().sort({ position: 1, createdAt: -1 });
  res.status(200).json({ success: true, count: ads.length, data: ads });
});

/**
 * @desc    Get single advertisement by ID
 * @route   GET /api/admin/advertisements/:id
 * @access  Private/Admin
 */
const getAdById = catchAsync(async (req, res) => {
  const ad = await Advertisement.findById(req.params.id);
  
  if (!ad) {
    res.status(404);
    throw new Error('Advertisement not found');
  }
  
  res.status(200).json({ success: true, data: ad });
});

/**
 * @desc    Update advertisement
 * @route   PUT /api/admin/advertisements/:id
 * @access  Private/Admin
 */
const updateAd = catchAsync(async (req, res) => {
  let ad = await Advertisement.findById(req.params.id);
  
  if (!ad) {
    res.status(404);
    throw new Error('Advertisement not found');
  }
  
  ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: ad });
});

/**
 * @desc    Delete advertisement
 * @route   DELETE /api/admin/advertisements/:id
 * @access  Private/Admin
 */
const deleteAd = catchAsync(async (req, res) => {
  const ad = await Advertisement.findById(req.params.id);
  
  if (!ad) {
    res.status(404);
    throw new Error('Advertisement not found');
  }
  
  await ad.deleteOne();
  
  res.status(200).json({ success: true, data: {} });
});

/**
 * @desc    Get public active advertisements for UI
 * @route   GET /api/public/advertisements
 * @access  Public
 */
const getPublicAds = catchAsync(async (req, res) => {
  const now = new Date();
  
  const query = {
    active: true,
    $and: [
      { startDate: { $lte: now } },
      { $or: [{ endDate: { $gt: now } }, { endDate: null }, { endDate: { $exists: false } }] }
    ]
  };

  const ads = await Advertisement.find(query).sort({ position: 1, createdAt: -1 });

  res.status(200).json({ success: true, count: ads.length, data: ads });
});

module.exports = {
  createAd,
  getAdminAds,
  getAdById,
  updateAd,
  deleteAd,
  getPublicAds
};
