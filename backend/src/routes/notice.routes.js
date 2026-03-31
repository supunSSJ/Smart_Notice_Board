const express = require('express');
const {
  createNotice,
  getAdminNotices,
  getPublicNotices,
  getNoticeById,
  updateNotice,
  deleteNotice
} = require('../controllers/notice.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes explicitly defined first to prevent ID parameter clashes
router.get('/public', getPublicNotices);

// Admin / Core routes
router.route('/')
  .post(protect, createNotice)
  .get(protect, getAdminNotices);

router.route('/:id')
  .get(getNoticeById) // Allowed publicly via direct link ID
  .put(protect, updateNotice)
  .delete(protect, deleteNotice);

module.exports = router;
